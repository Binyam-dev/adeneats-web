import "server-only";
import type { WaitlistPayload } from "./waitlist";

type EmailResult =
  | { ok: true; id: string }
  | { ok: false; reason: "not_configured" | "provider_error" };

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[
        character
      ]!,
  );
}

export async function sendWaitlistConfirmation(
  payload: WaitlistPayload,
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "not_configured" };

  const name = payload.name ? ` ${escapeHtml(payload.name.split(" ")[0])}` : "";
  const location = `${escapeHtml(payload.city)}, ${escapeHtml(payload.region)}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `waitlist-confirmation/${payload.role}/${payload.email}`,
    },
    body: JSON.stringify({
      from: "Aden Eats <noreply@adeneats.com>",
      to: [payload.email],
      subject: "You’re on the Aden Eats waitlist",
      text: `Selam${payload.name ? ` ${payload.name.split(" ")[0]}` : ""},\n\nWe have your place on the Aden Eats ${payload.role === "cook" ? "cook " : ""}waitlist for ${payload.city}, ${payload.region}.\n\nWe’ll email you at this address when Aden Eats is live and as access opens in your area.\n\nThank you for joining our table,\nThe Aden Eats team\nhttps://adeneats.com`,
      html: `<!doctype html><html><body style="margin:0;background:#17110d;color:#f4ead8;font-family:Arial,sans-serif"><div style="max-width:600px;margin:0 auto;padding:40px 24px"><p style="color:#e2a93b;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Aden Eats</p><h1 style="font-family:Georgia,serif;font-size:36px;line-height:1.1;margin:16px 0">Your place at the table is saved.</h1><p style="font-size:17px;line-height:1.7">Selam${name},</p><p style="font-size:17px;line-height:1.7">We have your place on the Aden Eats ${payload.role === "cook" ? "cook " : ""}waitlist for <strong>${location}</strong>.</p><p style="font-size:17px;line-height:1.7">We’ll email you at this address when Aden Eats is live and as access opens in your area.</p><div style="margin:32px 0;padding:20px;border-left:3px solid #1d9e75;background:#211812"><p style="margin:0;line-height:1.6">Home-cooked Habesha food, made by neighbors.</p></div><p style="font-size:17px;line-height:1.7">Thank you for joining our table,<br><strong>The Aden Eats team</strong></p><a href="https://adeneats.com" style="color:#e2a93b">adeneats.com</a></div></body></html>`,
    }),
  });

  if (!response.ok) {
    console.error("Waitlist confirmation email failed", { status: response.status });
    return { ok: false, reason: "provider_error" };
  }
  const data = (await response.json()) as { id?: string };
  return data.id
    ? { ok: true, id: data.id }
    : { ok: false, reason: "provider_error" };
}
