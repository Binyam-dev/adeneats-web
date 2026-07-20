"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Role = "client" | "cook";
type Status = "idle" | "submitting" | "success" | "duplicate" | "invalid" | "error";

const fieldWrapClass = "min-w-[200px] flex-1";
const inputClass =
  "w-full rounded-full border border-border bg-injera/5 px-6 py-3.5 text-injera outline-none transition-colors placeholder:text-injera-dim/60 focus:border-teal";

export default function WaitlistForm({ role }: { role: Role }) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cuisineSpecialty, setCuisineSpecialty] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailValid = email.trim().includes("@");
    const cityValid = city.trim().length > 0;
    const nameValid = role === "client" || name.trim().length > 0;
    if (!emailValid || !cityValid || !nameValid) {
      setStatus("invalid");
      return;
    }

    // A filled honeypot or a submit faster than a human can plausibly fill
    // the form both look like automated spam. Show success anyway so bots
    // don't learn to route around the check — just skip the real insert.
    const looksAutomated =
      honeypot.trim() !== "" ||
      mountedAt.current === null ||
      Date.now() - mountedAt.current < 1200;
    if (looksAutomated) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const { error } = await getSupabase()
        .from("launch_waitlist")
        .insert({
          email: email.trim().toLowerCase(),
          city: city.trim(),
          role,
          ...(role === "cook"
            ? { name: name.trim(), cuisine_specialty: cuisineSpecialty.trim() || null }
            : {}),
        });

      if (!error) {
        setStatus("success");
      } else if (error.code === "23505") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <p role="status" className="mt-6 font-medium text-teal">
        {status === "duplicate"
          ? "You're already on the list — we haven't forgotten you."
          : role === "cook"
            ? "You're on the list. We'll reach out as we open your city."
            : "You're on the list. We haven't forgotten you — we're coming."}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
    >
      {/* Honeypot: hidden from sighted users and assistive tech, visible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {role === "cook" && (
        <div className={fieldWrapClass}>
          <label htmlFor={`${role}-name`} className="sr-only">
            Your name
          </label>
          <input
            id={`${role}-name`}
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
      )}
      <div className={fieldWrapClass}>
        <label htmlFor={`${role}-email`} className="sr-only">
          Email
        </label>
        <input
          id={`${role}-email`}
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className={fieldWrapClass}>
        <label htmlFor={`${role}-city`} className="sr-only">
          City
        </label>
        <input
          id={`${role}-city`}
          type="text"
          placeholder="Your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputClass}
        />
      </div>
      {role === "cook" && (
        <div className={fieldWrapClass}>
          <label htmlFor={`${role}-cuisine`} className="sr-only">
            Cuisine specialty
          </label>
          <input
            id={`${role}-cuisine`}
            type="text"
            placeholder="Cuisine specialty (optional)"
            value={cuisineSpecialty}
            onChange={(e) => setCuisineSpecialty(e.target.value)}
            className={inputClass}
          />
        </div>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-teal px-7 py-3.5 font-medium text-injera shadow-[0_6px_24px_rgb(29_158_117_/_0.35)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "submitting"
          ? "Joining…"
          : role === "cook"
            ? "Apply to cook"
            : "Join the waitlist"}
      </button>

      {status === "invalid" && (
        <p role="alert" className="w-full text-sm text-berbere">
          {role === "cook"
            ? "Enter your name, a valid email, and your city."
            : "Enter a valid email and your city."}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="w-full text-sm text-berbere">
          Something went wrong on our end — mind trying again in a moment?
        </p>
      )}
    </form>
  );
}
