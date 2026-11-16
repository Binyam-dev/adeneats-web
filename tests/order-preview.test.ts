import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isUnconfiguredOrderPreview } from "../lib/order-preview.ts";

test("only unconfigured preview environments use the data-free fallback", () => {
  for (const VERCEL_ENV of [undefined, "production", "development", "preview"]) {
    for (const NEXT_PUBLIC_SUPABASE_URL of [undefined, "", "https://example.supabase.co"]) {
      for (const NEXT_PUBLIC_SUPABASE_ANON_KEY of [undefined, "", "test-only-placeholder"]) {
        const expected = VERCEL_ENV === "preview" && (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY);
        assert.equal(isUnconfiguredOrderPreview({ VERCEL_ENV, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY }), expected);
      }
    }
  }
});
test("both order routes guard database construction, while strict client is unchanged", () => {
  for (const path of ["app/order/page.tsx", "app/order/[id]/page.tsx"]) {
    const source = readFileSync(path, "utf8");
    assert.ok(source.indexOf("if (isUnconfiguredOrderPreview(process.env))") < source.indexOf("const supabase = getServerSupabase()"));
    assert.match(source, /return <OrderPreviewUnavailable \/>/);
  }
  assert.match(readFileSync("lib/supabase-server.ts", "utf8"), /throw new Error/);
  assert.match(readFileSync("next.config.ts", "utf8"), /destination: "\/#waitlist"/);
});
