"use server";

import config from "@payload-config";
import { getPayload } from "payload";

export type SubmitResult = {
  status: "idle" | "success" | "error";
};

export async function submitInquiry(
  _prev: SubmitResult,
  formData: FormData,
): Promise<SubmitResult> {
  // Honeypot: real visitors never see this field; bots that fill it get a
  // fake success so they don't retry.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
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
    return { status: "success" };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { status: "error" };
  }
}
