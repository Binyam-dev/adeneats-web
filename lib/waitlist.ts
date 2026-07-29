export type WaitlistRole = "client" | "cook";

export type WaitlistPayload = {
  email: string;
  city: string;
  region: string;
  role: WaitlistRole;
  name: string | null;
  cuisineSpecialty: string | null;
  website: string;
};

export type WaitlistField = "email" | "city" | "region" | "name" | "cuisineSpecialty";
export type WaitlistFieldErrors = Partial<Record<WaitlistField, string>>;

export type WaitlistResponse =
  | {
      ok: true;
      status: "created" | "existing";
      emailConfirmation?: "sent" | "pending";
    }
  | {
      ok: false;
      code: "VALIDATION_ERROR" | "CONFIG_ERROR" | "DATABASE_ERROR";
      fieldErrors?: WaitlistFieldErrors;
      message: string;
    };

const MAX = {
  email: 254,
  city: 100,
  region: 100,
  name: 100,
  cuisineSpecialty: 160,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function validateWaitlistPayload(
  input: unknown,
):
  | { ok: true; data: WaitlistPayload }
  | { ok: false; fieldErrors: WaitlistFieldErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      ok: false,
      fieldErrors: { email: "Enter a valid email address." },
    };
  }

  const raw = input as Record<string, unknown>;
  const email = normalizeText(raw.email).toLowerCase();
  const city = normalizeText(raw.city);
  const region = normalizeText(raw.region);
  const name = normalizeText(raw.name);
  const cuisineSpecialty = normalizeText(raw.cuisineSpecialty);
  const website = normalizeText(raw.website);
  const role = raw.role;
  const fieldErrors: WaitlistFieldErrors = {};

  if (!email || !EMAIL_PATTERN.test(email) || email.length > MAX.email) {
    fieldErrors.email =
      email.length > MAX.email
        ? `Email must be ${MAX.email} characters or fewer.`
        : "Enter a valid email address.";
  }
  if (!city) {
    fieldErrors.city = "Enter your city.";
  } else if (city.length > MAX.city) {
    fieldErrors.city = `City must be ${MAX.city} characters or fewer.`;
  }
  if (!region) {
    fieldErrors.region = "Enter your state or region.";
  } else if (region.length > MAX.region) {
    fieldErrors.region = `State or region must be ${MAX.region} characters or fewer.`;
  }
  if (role !== "client" && role !== "cook") {
    return { ok: false, fieldErrors };
  }
  if (role === "cook" && !name) {
    fieldErrors.name = "Enter your name.";
  } else if (name.length > MAX.name) {
    fieldErrors.name = `Name must be ${MAX.name} characters or fewer.`;
  }
  if (cuisineSpecialty.length > MAX.cuisineSpecialty) {
    fieldErrors.cuisineSpecialty =
      `Specialty must be ${MAX.cuisineSpecialty} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      email,
      city,
      region,
      role,
      name: role === "cook" ? name : null,
      cuisineSpecialty:
        role === "cook" && cuisineSpecialty ? cuisineSpecialty : null,
      website,
    },
  };
}
