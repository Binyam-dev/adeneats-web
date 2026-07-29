"use client";

import { useState } from "react";
import type {
  WaitlistField,
  WaitlistFieldErrors,
  WaitlistResponse,
  WaitlistRole,
} from "@/lib/waitlist";

type Status = "idle" | "submitting" | "created" | "existing" | "error";

const fieldClass =
  "min-w-0 text-left";
const inputClass =
  "min-h-12 w-full rounded-2xl border border-border bg-injera/5 px-4 py-3 text-base text-injera outline-none transition-[border-color,background-color,box-shadow] placeholder:text-injera-dim/55 hover:border-injera/25 focus:border-gold focus:bg-injera/[0.07] focus:shadow-[0_0_0_3px_rgb(226_169_59_/_0.14)] disabled:cursor-not-allowed disabled:opacity-60";

type Values = {
  name: string;
  email: string;
  city: string;
  cuisineSpecialty: string;
  website: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  city: "",
  cuisineSpecialty: "",
  website: "",
};

function validateField(
  field: WaitlistField,
  value: string,
  role: WaitlistRole,
): string | undefined {
  const normalized = value.trim();
  if (field === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return "Enter a valid email address.";
    }
    if (normalized.length > 254) return "Email must be 254 characters or fewer.";
  }
  if (field === "city" && !normalized) return "Enter your city.";
  if (field === "city" && normalized.length > 100) {
    return "City must be 100 characters or fewer.";
  }
  if (field === "name" && role === "cook" && !normalized) {
    return "Enter your name.";
  }
  if (field === "name" && normalized.length > 100) {
    return "Name must be 100 characters or fewer.";
  }
  if (field === "cuisineSpecialty" && normalized.length > 160) {
    return "Specialty must be 160 characters or fewer.";
  }
}

export default function WaitlistForm({ role }: { role: WaitlistRole }) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<WaitlistFieldErrors>({});
  const [message, setMessage] = useState("");

  const isSuccess = status === "created" || status === "existing";
  const isSubmitting = status === "submitting";

  function update(field: keyof Values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field in fieldErrors) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  function handleBlur(field: WaitlistField) {
    const error = validateField(field, values[field], role);
    setFieldErrors((current) => ({ ...current, [field]: error }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const fields: WaitlistField[] =
      role === "cook"
        ? ["name", "email", "city", "cuisineSpecialty"]
        : ["email", "city"];
    const nextErrors = Object.fromEntries(
      fields
        .map((field) => [field, validateField(field, values[field], role)] as const)
        .filter((entry): entry is [WaitlistField, string] => Boolean(entry[1])),
    );
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus("idle");
      setMessage("Check the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, role }),
      });
      const result = (await response.json()) as WaitlistResponse;
      if (result.ok) {
        setStatus(result.status);
        setMessage(
          result.status === "existing"
            ? "You're already on the list — we haven't forgotten you."
            : role === "cook"
              ? "You're on the list. We'll reach out as onboarding opens in your city."
              : "You're on the list. We'll let you know when Aden reaches your city.",
        );
        return;
      }

      setFieldErrors(result.fieldErrors ?? {});
      setStatus("error");
      setMessage(result.message);
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't reach the waitlist service. Check your connection and try again.",
      );
    }
  }

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-8 rounded-[var(--radius-card)] border border-teal/30 bg-teal-tint px-6 py-5 text-left"
      >
        <p className="font-medium text-injera">{message}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="mt-3 min-h-11 rounded-full text-sm font-semibold text-teal underline decoration-teal/45 underline-offset-4 hover:decoration-teal"
        >
          Edit your information
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8" aria-busy={isSubmitting}>
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${role}-website`}>Website</label>
        <input
          id={`${role}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        {role === "cook" && (
          <Field
            field="name"
            label="Your name"
            value={values.name}
            error={fieldErrors.name}
            autoComplete="name"
            onChange={update}
            onBlur={handleBlur}
          />
        )}
        <Field
          field="email"
          label="Email address"
          type="email"
          value={values.email}
          error={fieldErrors.email}
          autoComplete="email"
          inputMode="email"
          onChange={update}
          onBlur={handleBlur}
        />
        <Field
          field="city"
          label="City"
          value={values.city}
          error={fieldErrors.city}
          autoComplete="address-level2"
          onChange={update}
          onBlur={handleBlur}
        />
        {role === "cook" && (
          <Field
            field="cuisineSpecialty"
            label="Cuisine specialty"
            hint="Optional"
            value={values.cuisineSpecialty}
            error={fieldErrors.cuisineSpecialty}
            autoComplete="off"
            onChange={update}
            onBlur={handleBlur}
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-teal px-7 py-3 font-semibold text-injera shadow-[0_6px_24px_rgb(29_158_117_/_0.3)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-teal-deep focus-visible:outline-offset-4 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-65 sm:w-auto"
      >
        {isSubmitting && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-injera/35 border-t-injera"
          />
        )}
        {isSubmitting
          ? "Joining…"
          : role === "cook"
            ? "Apply to cook"
            : "Join the waitlist"}
      </button>

      <p
        aria-live="polite"
        role={status === "error" || Object.keys(fieldErrors).length ? "alert" : "status"}
        className={`mt-4 min-h-5 text-sm ${
          status === "error" || Object.keys(fieldErrors).length
            ? "text-error"
            : "text-injera-dim"
        }`}
      >
        {message}
      </p>
    </form>
  );
}

function Field({
  field,
  label,
  hint,
  value,
  error,
  type = "text",
  autoComplete,
  inputMode,
  onChange,
  onBlur,
}: {
  field: WaitlistField;
  label: string;
  hint?: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (field: keyof Values, value: string) => void;
  onBlur: (field: WaitlistField) => void;
}) {
  const id = `waitlist-${field}`;
  const errorId = `${id}-error`;
  return (
    <div className={fieldClass}>
      <label htmlFor={id} className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-injera">
        {label}
        {hint && <span className="text-xs font-normal text-injera-dim">{hint}</span>}
      </label>
      <input
        id={id}
        name={field}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(field, event.target.value)}
        onBlur={() => onBlur(field)}
        className={`${inputClass} ${error ? "border-error focus:border-error" : ""}`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
