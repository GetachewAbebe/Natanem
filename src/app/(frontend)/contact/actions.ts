"use server";

import config from "@payload-config";
import { headers } from "next/headers";
import { getPayload } from "payload";

import { rateLimit } from "@/lib/rateLimit";

export type SubmitResult = {
  status: "idle" | "success" | "error" | "rateLimited";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
