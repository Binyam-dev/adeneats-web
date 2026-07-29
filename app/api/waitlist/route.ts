import { NextResponse, type NextRequest } from "next/server";
import { validateWaitlistPayload, type WaitlistResponse } from "@/lib/waitlist";
import { getWaitlistInsert } from "@/lib/waitlist-server";
import { insertWaitlistEntry } from "@/lib/waitlist-service";
import { sendWaitlistConfirmation } from "@/lib/waitlist-email";

const JSON_TYPE = "application/json";
const MAX_BODY_BYTES = 8_192;

function json(body: WaitlistResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function isSameOrigin(request: NextRequest): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith(JSON_TYPE)) {
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Send the form as JSON.",
      },
      415,
    );
  }
  if (!isSameOrigin(request)) {
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "This request couldn't be verified. Refresh the page and try again.",
      },
      403,
    );
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "The submitted form is too large.",
      },
      413,
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "The form data couldn't be read. Refresh the page and try again.",
      },
      400,
    );
  }

  const validated = validateWaitlistPayload(input);
  if (!validated.ok) {
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        fieldErrors: validated.fieldErrors,
        message: "Check the highlighted fields and try again.",
      },
      400,
    );
  }

  const result = await insertWaitlistEntry(validated.data, getWaitlistInsert());
  let responseResult: WaitlistResponse = result;
  if (result.ok && result.status === "created") {
    try {
      const email = await sendWaitlistConfirmation(validated.data);
      responseResult = {
        ...result,
        emailConfirmation: email.ok ? "sent" : "pending",
      };
    } catch (error) {
      console.error("Waitlist confirmation email threw", {
        name: error instanceof Error ? error.name : "UnknownError",
      });
      responseResult = { ...result, emailConfirmation: "pending" };
    }
  }
  return json(
    responseResult,
    result.ok
      ? 200
      : result.code === "VALIDATION_ERROR"
        ? 400
        : result.code === "CONFIG_ERROR"
          ? 503
          : 500,
  );
}
