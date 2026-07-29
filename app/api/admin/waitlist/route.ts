import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-server";

function response(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

export async function GET(request: Request) {
  const auth = await authorizeAdmin(request);
  if (!auth.ok) return response({ ok: false, message: auth.message }, auth.status);

  const { data, error } = await auth.client
    .from("launch_waitlist")
    .select("id,name,email,city,region,role,cuisine_specialty,created_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("Admin waitlist read failed", { code: error.code });
    return response({ ok: false, message: "The waitlist could not be loaded." }, 500);
  }
  return response({ ok: true, entries: data });
}
