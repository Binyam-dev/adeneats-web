import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-server";

function response(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

export async function GET(request: Request) {
  const auth = await authorizeAdmin(request);
  if (!auth.ok) return response({ ok: false, message: auth.message }, auth.status);
  const { data, error } = await auth.client
    .from("cook_listings")
    .select("*, menu_items(*)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Admin listing read failed", { code: error.code });
    return response({ ok: false, message: "Listings could not be loaded." }, 500);
  }
  return response({ ok: true, listings: data, adminEmail: auth.user.email });
}

export async function POST(request: Request) {
  const auth = await authorizeAdmin(request);
  if (!auth.ok) return response({ ok: false, message: auth.message }, auth.status);
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return response({ ok: false, message: "Invalid request body." }, 400);
  }

  if (body.entity === "listing") {
    const name = text(body.name, 100);
    if (!name) return response({ ok: false, message: "Cook name is required." }, 400);
    const { data, error } = await auth.client
      .from("cook_listings")
      .insert({
        name,
        city: text(body.city, 100) || null,
        cuisine_specialty: text(body.cuisineSpecialty, 120) || null,
        bio: text(body.bio, 600) || null,
        photo_url: text(body.photoUrl, 500) || null,
        is_published: false,
      })
      .select()
      .single();
    if (error) {
      console.error("Admin listing create failed", { code: error.code });
      return response({ ok: false, message: "Cook listing could not be created." }, 500);
    }
    return response({ ok: true, listing: data }, 201);
  }

  if (body.entity === "menuItem") {
    const cookListingId = text(body.cookListingId, 64);
    const name = text(body.name, 120);
    const priceCents = Number(body.priceCents);
    if (!cookListingId || !name || !Number.isInteger(priceCents) || priceCents < 0) {
      return response({ ok: false, message: "Cook, dish name, and a valid price are required." }, 400);
    }
    const { data, error } = await auth.client
      .from("menu_items")
      .insert({
        cook_listing_id: cookListingId,
        name,
        description: text(body.description, 500) || null,
        price_cents: priceCents,
        fasting_friendly: body.fastingFriendly === true,
        is_available: true,
      })
      .select()
      .single();
    if (error) {
      console.error("Admin menu create failed", { code: error.code });
      return response({ ok: false, message: "Menu item could not be created." }, 500);
    }
    return response({ ok: true, item: data }, 201);
  }

  return response({ ok: false, message: "Unknown admin operation." }, 400);
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdmin(request);
  if (!auth.ok) return response({ ok: false, message: auth.message }, auth.status);
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return response({ ok: false, message: "Invalid request body." }, 400);
  }
  const id = text(body.id, 64);
  if (!id) return response({ ok: false, message: "Record ID is required." }, 400);

  if (body.entity === "listing") {
    const { error } = await auth.client
      .from("cook_listings")
      .update({ is_published: body.isPublished === true })
      .eq("id", id);
    if (error) return response({ ok: false, message: "Listing could not be updated." }, 500);
    return response({ ok: true });
  }
  if (body.entity === "menuItem") {
    const { error } = await auth.client
      .from("menu_items")
      .update({ is_available: body.isAvailable === true })
      .eq("id", id);
    if (error) return response({ ok: false, message: "Menu item could not be updated." }, 500);
    return response({ ok: true });
  }
  return response({ ok: false, message: "Unknown admin operation." }, 400);
}
