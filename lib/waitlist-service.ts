import type { WaitlistPayload, WaitlistResponse } from "./waitlist";

type InsertResult = { error: { code?: string; message?: string } | null };
export type WaitlistInsert = (payload: WaitlistPayload) => Promise<InsertResult>;

export async function insertWaitlistEntry(
  payload: WaitlistPayload,
  insert: WaitlistInsert | null,
): Promise<WaitlistResponse> {
  if (payload.website) {
    return {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "This request couldn't be verified. Refresh the page and try again.",
    };
  }

  if (!insert) {
    return {
      ok: false,
      code: "CONFIG_ERROR",
      message: "Waitlist sign-up is temporarily unavailable. Please try again later.",
    };
  }

  try {
    const { error } = await insert(payload);
    if (!error) return { ok: true, status: "created" };
    if (error.code === "23505") return { ok: true, status: "existing" };

    console.error("Waitlist insert failed", {
      code: error.code ?? "unknown",
      message: error.message ?? "No database message",
    });
    return {
      ok: false,
      code: "DATABASE_ERROR",
      message: "We couldn't save your place right now. Please try again in a moment.",
    };
  } catch (error) {
    console.error("Waitlist insert threw", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return {
      ok: false,
      code: "DATABASE_ERROR",
      message: "We couldn't save your place right now. Please try again in a moment.",
    };
  }
}
