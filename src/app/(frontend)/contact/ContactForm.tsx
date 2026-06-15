"use client";

import { useActionState } from "react";

import type { ContactPage } from "@/payload-types";

import { submitInquiry, type SubmitResult } from "./actions";

const inputClasses =
  "w-full border border-ink-100 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-600/60 focus:border-amber-brand focus:outline-none focus:ring-2 focus:ring-amber-brand/30";

type Props = {
  texts: ContactPage["form"];
  services: { slug: string; title: string }[];
};

const initialState: SubmitResult = { status: "idle" };

export default function ContactForm({ texts, services }: Props) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="border-l-4 border-amber-brand bg-ink-50 p-8">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-ink-900">
          {texts.successTitle}
        </h3>
        <p className="mt-2 text-ink-700">{texts.successText}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-6 sm:grid-cols-2">
      {state.status === "error" && (
        <div className="border-l-4 border-red-600 bg-red-50 p-4 sm:col-span-2">
          <p className="text-sm text-red-800">
            {texts.errorText ??
              "Something went wrong and your inquiry could not be sent. Please try again."}
          </p>
        </div>
      )}
      {state.status === "rateLimited" && (
        <div className="border-l-4 border-amber-deep bg-amber-50 p-4 sm:col-span-2">
          <p className="text-sm text-ink-800">
            You have sent several inquiries already. Please wait a few minutes
            before sending another, or contact us directly by phone or email.
          </p>
        </div>
      )}
      {/* Honeypot field — hidden from real visitors, catches naive bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium uppercase tracking-wide text-ink-900">
          {texts.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={texts.namePlaceholder}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-wide text-ink-900">
          {texts.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={texts.emailPlaceholder}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium uppercase tracking-wide text-ink-900">
          {texts.phoneLabel}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={texts.phonePlaceholder}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium uppercase tracking-wide text-ink-900">
          {texts.serviceLabel}
        </label>
        <select id="service" name="service" className={inputClasses} defaultValue="">
          <option value="" disabled>
            {texts.servicePlaceholder}
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value={texts.otherServiceOption}>{texts.otherServiceOption}</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 block text-sm font-medium uppercase tracking-wide text-ink-900">
          {texts.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={texts.messagePlaceholder}
          className={inputClasses}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-amber-brand px-10 py-4 font-display font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-amber-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {texts.submitLabel}
        </button>
      </div>
    </form>
  );
}
