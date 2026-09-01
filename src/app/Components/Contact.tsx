"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

/* Web3Forms access keys are public by design — they identify the destination
   inbox for client-side submissions and carry no account privileges. */
const ACCESS_KEY = "8ee2a40f-2f49-4fc8-a506-016b92d4c558";

/* Match sweetalert2's default light theme to the site palette. */
const ALERT_THEME = {
  background: "#141414",
  color: "#f2f2f2",
  confirmButtonColor: "#4B9CD3",
} as const;

const FIELD =
  "w-full rounded-md border border-edge bg-ink px-3 py-2 text-sm text-chalk placeholder:text-ash/60 outline-none transition-colors focus:border-carolina";

export default function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      }).then((r) => r.json());

      if (res.success) {
        form.reset();
        await Swal.fire({
          title: "Sent",
          text: "Thanks — I'll get back to you soon.",
          icon: "success",
          ...ALERT_THEME,
        });
      } else {
        await Swal.fire({
          title: "Something went wrong",
          text: res.message ?? "Your message was not sent. Please try again.",
          icon: "error",
          ...ALERT_THEME,
        });
      }
    } catch {
      await Swal.fire({
        title: "Network error",
        text: "Could not reach the server. Please check your connection and try again.",
        icon: "error",
        ...ALERT_THEME,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-ash">
          Full name
        </label>
        <input id="name" name="name" type="text" required placeholder="Your name" className={FIELD} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-ash">
          Email address
        </label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" className={FIELD} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-ash">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} placeholder="What would you like to talk about?" className={`${FIELD} resize-y`} />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-2 w-fit rounded-md border border-carolina bg-carolina px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-carolina disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
