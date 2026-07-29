"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";
import type { CookListing } from "@/lib/order-types";
import { formatPrice } from "@/lib/order-types";

type ApiState = "idle" | "loading" | "ready" | "error";
type WaitlistEntry = {
  id: string;
  name: string | null;
  email: string;
  city: string | null;
  region: string | null;
  role: "client" | "cook";
  cuisine_specialty: string | null;
  created_at: string;
};

export default function AdminWorkspace() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<ApiState>("idle");
  const [listings, setListings] = useState<CookListing[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [waitlistState, setWaitlistState] = useState<ApiState>("idle");

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const loadListings = useCallback(async (activeSession = session) => {
    if (!activeSession) return;
    setState("loading");
    const result = await adminFetch(activeSession, "/api/admin/listings");
    if (!result.ok) {
      setState("error");
      setMessage(result.message ?? "Admin data could not be loaded.");
      return;
    }
    setListings(result.listings as CookListing[]);
    setState("ready");
  }, [session]);

  const loadWaitlist = useCallback(async (activeSession = session) => {
    if (!activeSession) return;
    setWaitlistState("loading");
    const result = await adminFetch(activeSession, "/api/admin/waitlist");
    if (!result.ok) {
      setWaitlistState("error");
      setMessage(result.message ?? "Waitlist data could not be loaded.");
      return;
    }
    setWaitlist(result.entries as WaitlistEntry[]);
    setWaitlistState("ready");
  }, [session]);

  useEffect(() => {
    if (!session) return;
    const frame = window.requestAnimationFrame(() => {
      void loadListings(session);
      void loadWaitlist(session);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [loadListings, loadWaitlist, session]);

  async function sendLink(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    const { error } = await getSupabase().auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setState(error ? "error" : "idle");
    setMessage(error ? "The sign-in link could not be sent." : "Check your email for a secure sign-in link.");
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-lg rounded-[var(--radius-panel)] border border-border bg-teff-panel p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Authorized team only</p>
        <h1 className="mt-3 font-display text-4xl text-injera">Aden kitchen desk</h1>
        <p className="mt-4 text-injera-dim">Sign in with an email address listed in the server-side admin allowlist.</p>
        <form onSubmit={sendLink} className="mt-7">
          <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-injera">Email address</label>
          <input id="admin-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 w-full rounded-2xl border border-border bg-injera/5 px-4 text-injera outline-none focus:border-gold" />
          <button disabled={state === "loading"} className="mt-4 min-h-12 w-full rounded-full bg-teal px-6 font-semibold text-injera disabled:opacity-60">
            {state === "loading" ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
        <p aria-live="polite" className="mt-4 text-sm text-injera-dim">{message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Admin workspace</p>
          <h1 className="mt-2 font-display text-4xl text-injera">Kitchen listings</h1>
        </div>
        <button type="button" onClick={() => getSupabase().auth.signOut()} className="min-h-11 rounded-full border border-border px-5 text-sm text-injera">Sign out</button>
      </div>
      {state === "error" && <p role="alert" className="mt-6 rounded-2xl border border-error/30 bg-berbere-tint p-4 text-error">{message}</p>}
      <WaitlistDirectory entries={waitlist} state={waitlistState} />
      <CreateListing session={session} onCreated={() => loadListings()} />
      <div className="mt-8 space-y-5">
        {state === "loading" ? (
          <p className="text-injera-dim">Loading kitchen desk…</p>
        ) : (
          listings.map((listing) => (
            <article key={listing.id} className="rounded-[var(--radius-panel)] border border-border bg-teff-panel p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl text-injera">{listing.name}</h2>
                  <p className="text-sm text-injera-dim">{[listing.city, listing.cuisine_specialty].filter(Boolean).join(" · ")}</p>
                </div>
                <button type="button" onClick={async () => { await adminFetch(session, "/api/admin/listings", { method: "PATCH", body: JSON.stringify({ entity: "listing", id: listing.id, isPublished: !listing.is_published }) }); await loadListings(); }} className={`min-h-11 rounded-full px-4 text-sm font-semibold ${listing.is_published ? "bg-teal text-injera" : "border border-border text-injera-dim"}`}>
                  {listing.is_published ? "Published" : "Draft"}
                </button>
              </div>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {listing.menu_items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span className="text-injera">{item.name} <span className="text-injera-dim">· {formatPrice(item.price_cents)}</span></span>
                    <button type="button" onClick={async () => { await adminFetch(session, "/api/admin/listings", { method: "PATCH", body: JSON.stringify({ entity: "menuItem", id: item.id, isAvailable: item.is_available === false }) }); await loadListings(); }} className="min-h-11 text-teal">
                      {item.is_available === false ? "Make available" : "Pause"}
                    </button>
                  </li>
                ))}
              </ul>
              <CreateMenuItem session={session} cookId={listing.id} onCreated={() => loadListings()} />
            </article>
          ))
        )}
      </div>
    </div>
  );
}

function WaitlistDirectory({ entries, state }: { entries: WaitlistEntry[]; state: ApiState }) {
  function exportCsv() {
    const quote = (value: string | null) => `"${(value ?? "").replaceAll('"', '""')}"`;
    const rows = [
      ["Name", "Email", "City", "State or region", "Type", "Cuisine specialty", "Joined"],
      ...entries.map((entry) => [
        entry.name ?? "",
        entry.email,
        entry.city ?? "",
        entry.region ?? "",
        entry.role === "cook" ? "Cook" : "Customer",
        entry.cuisine_specialty ?? "",
        entry.created_at,
      ]),
    ];
    const csv = rows.map((row) => row.map(quote).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `adeneats-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-8 overflow-hidden rounded-[var(--radius-panel)] border border-gold/20 bg-teff-panel">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Community</p>
          <h2 className="mt-1 font-display text-3xl text-injera">Waitlist · {entries.length}</h2>
        </div>
        <button type="button" disabled={!entries.length} onClick={exportCsv} className="min-h-11 rounded-full border border-gold px-5 text-sm font-semibold text-gold disabled:cursor-not-allowed disabled:opacity-40">
          Export CSV
        </button>
      </div>
      {state === "loading" || state === "idle" ? (
        <p className="p-6 text-injera-dim">Loading waitlist…</p>
      ) : state === "error" ? (
        <p className="p-6 text-error">The waitlist could not be loaded.</p>
      ) : entries.length === 0 ? (
        <p className="p-6 text-injera-dim">No one has joined yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-injera/5 text-xs uppercase tracking-wider text-injera-dim">
              <tr>
                <th className="px-5 py-3 font-semibold">Name / email</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-5 py-4">
                    <span className="block font-medium text-injera">{entry.name || "Customer"}</span>
                    <a className="text-teal hover:underline" href={`mailto:${entry.email}`}>{entry.email}</a>
                  </td>
                  <td className="px-5 py-4 text-injera-dim">
                    {[entry.city, entry.region].filter(Boolean).join(", ") || "Not provided"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-teal-tint px-3 py-1 text-xs font-semibold capitalize text-teal">{entry.role}</span>
                    {entry.cuisine_specialty && <span className="ml-2 text-injera-dim">{entry.cuisine_specialty}</span>}
                  </td>
                  <td className="px-5 py-4 text-injera-dim">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(entry.created_at))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function CreateListing({ session, onCreated }: { session: Session; onCreated: () => void }) {
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await adminFetch(session, "/api/admin/listings", { method: "POST", body: JSON.stringify({ entity: "listing", name: form.get("name"), city: form.get("city"), cuisineSpecialty: form.get("specialty"), bio: form.get("bio") }) });
    event.currentTarget.reset();
    onCreated();
  }
  return (
    <form onSubmit={submit} className="mt-8 grid gap-3 rounded-[var(--radius-panel)] border border-teal/20 bg-teal-tint p-5 sm:grid-cols-2">
      <h2 className="font-display text-2xl text-injera sm:col-span-2">Add a vetted cook</h2>
      <input name="name" required placeholder="Public display name" aria-label="Public display name" className="min-h-12 rounded-xl border border-border bg-teff px-4 text-injera" />
      <input name="city" placeholder="City" aria-label="City" className="min-h-12 rounded-xl border border-border bg-teff px-4 text-injera" />
      <input name="specialty" placeholder="Cuisine specialty" aria-label="Cuisine specialty" className="min-h-12 rounded-xl border border-border bg-teff px-4 text-injera sm:col-span-2" />
      <textarea name="bio" placeholder="Public bio" aria-label="Public bio" className="min-h-24 rounded-xl border border-border bg-teff p-4 text-injera sm:col-span-2" />
      <button className="min-h-12 rounded-full bg-teal px-5 font-semibold text-injera sm:col-span-2">Create draft listing</button>
    </form>
  );
}

function CreateMenuItem({ session, cookId, onCreated }: { session: Session; cookId: string; onCreated: () => void }) {
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await adminFetch(session, "/api/admin/listings", { method: "POST", body: JSON.stringify({ entity: "menuItem", cookListingId: cookId, name: form.get("name"), description: form.get("description"), priceCents: Math.round(Number(form.get("price")) * 100), fastingFriendly: form.get("fasting") === "on" }) });
    event.currentTarget.reset();
    onCreated();
  }
  return (
    <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_8rem_auto]">
      <input name="name" required placeholder="Dish name" aria-label="Dish name" className="min-h-11 rounded-xl border border-border bg-teff px-3 text-injera" />
      <input name="price" required min="0" step="0.01" type="number" placeholder="Price" aria-label="Price" className="min-h-11 rounded-xl border border-border bg-teff px-3 text-injera" />
      <label className="flex min-h-11 items-center gap-2 text-sm text-injera-dim"><input name="fasting" type="checkbox" /> Fasting</label>
      <input name="description" placeholder="Description" aria-label="Description" className="min-h-11 rounded-xl border border-border bg-teff px-3 text-injera sm:col-span-2" />
      <button className="min-h-11 rounded-full border border-teal px-4 text-sm font-semibold text-teal">Add dish</button>
    </form>
  );
}

async function adminFetch(session: Session, url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...init?.headers,
    },
  });
  return (await response.json()) as Record<string, unknown> & { ok: boolean; message?: string };
}
