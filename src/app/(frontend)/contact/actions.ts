"use server";

import config from "@payload-config";
import { headers } from "next/headers";
import { getPayload } from "payload";

import { rateLimit } from "@/lib/rateLimit";

export type SubmitResult = {
  status: "idle" | "success" | "error" | "rateLimited";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(d: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): string {
  const date = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e3e9f2;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e3e9f2;color:#0a1120;font-size:15px;font-weight:600;">${value}</td>
    </tr>`;

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:2px;overflow:hidden;box-shadow:0 2px 8px rgba(10,17,32,0.08);">
        <tr><td style="background:#0a1120;padding:26px 32px;text-align:center;">
          <img src="https://natanemengineering.com/logo-full-white.png" alt="Natanem Engineering" height="40" style="height:40px;width:auto;display:inline-block;" />
        </td></tr>
        <tr><td style="height:4px;background:#f5a623;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 6px;color:#d98b0f;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:3px;">New Website Inquiry</p>
          <h1 style="margin:0 0 24px;color:#0a1120;font-size:24px;font-weight:bold;">${escapeHtml(d.name)}</h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Email", `<a href="mailto:${escapeHtml(d.email)}" style="color:#d98b0f;text-decoration:none;">${escapeHtml(d.email)}</a>`)}
            ${d.phone ? row("Phone", `<a href="tel:${escapeHtml(d.phone.replace(/\s+/g, ""))}" style="color:#0a1120;text-decoration:none;">${escapeHtml(d.phone)}</a>`) : ""}
            ${d.service ? row("Service", escapeHtml(d.service)) : ""}
          </table>
          <div style="margin-top:24px;padding:18px 22px;background:#f3f6fa;border-left:4px solid #f5a623;">
            <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
            <p style="margin:0;color:#1a2740;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(d.message)}</p>
          </div>
        </td></tr>
        <tr><td style="background:#f3f6fa;padding:16px 32px;text-align:center;color:#8a94a6;font-size:12px;border-top:1px solid #e3e9f2;">
          Sent from the natanemengineering.com contact form · ${date}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function submitInquiry(
  _prev: SubmitResult,
  formData: FormData,
): Promise<SubmitResult> {
  // Honeypot: real visitors never see this field; bots that fill it get a
  // fake success so they don't retry.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success" };
  }

  // Throttle: at most 5 submissions per IP per 10 minutes.
  const ip = await getClientIp();
  const { allowed } = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return { status: "rateLimited" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return { status: "error" };
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-submissions",
      data: {
        name: name.slice(0, 200),
        email: email.slice(0, 200),
        phone: phone.slice(0, 50) || undefined,
        service: service.slice(0, 200) || undefined,
        message: message.slice(0, 5000),
      },
    });

    // Notify the team by email. Best-effort: a mail failure must not fail the
    // submission, which is already safely stored in the CMS.
    const notifyTo = process.env.CONTACT_NOTIFY_TO;
    if (notifyTo) {
      try {
        await payload.sendEmail({
          to: notifyTo,
          // Reply goes straight to the visitor.
          replyTo: `${name} <${email}>`,
          subject: `New website inquiry from ${name.slice(0, 80)}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : null,
            service ? `Service: ${service}` : null,
            "",
            "Message:",
            message,
          ]
            .filter((line) => line !== null)
            .join("\n"),
          html: buildEmailHtml({ name, email, phone, service, message }),
        });
      } catch (mailError) {
        console.error("Contact notification email failed:", mailError);
      }
    }

    return { status: "success" };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { status: "error" };
  }
}
