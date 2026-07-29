import assert from "node:assert/strict";
import test from "node:test";
import { validateWaitlistPayload, type WaitlistPayload } from "../lib/waitlist.ts";
import { insertWaitlistEntry } from "../lib/waitlist-service.ts";

const customer: WaitlistPayload = {
  email: "neighbor@example.com",
  city: "Silver Spring",
  region: "Maryland",
  role: "client",
  name: null,
  cuisineSpecialty: null,
  website: "",
};

test("normalizes a valid customer submission", () => {
  const result = validateWaitlistPayload({
    email: "  Neighbor@Example.COM ",
    city: "  Silver   Spring ",
    region: " Maryland ",
    role: "client",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.email, "neighbor@example.com");
    assert.equal(result.data.city, "Silver Spring");
    assert.equal(result.data.region, "Maryland");
    assert.equal(result.data.name, null);
  }
});

test("accepts and normalizes a valid cook submission", () => {
  const result = validateWaitlistPayload({
    email: "cook@example.com",
    city: "Alexandria",
    region: "Virginia",
    role: "cook",
    name: "  Selam   Tesfaye ",
    cuisineSpecialty: " Doro wat ",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.name, "Selam Tesfaye");
    assert.equal(result.data.cuisineSpecialty, "Doro wat");
  }
});

test("rejects missing required fields", () => {
  const result = validateWaitlistPayload({ role: "cook", email: "", city: "", region: "" });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.fieldErrors.email);
    assert.ok(result.fieldErrors.city);
    assert.ok(result.fieldErrors.region);
    assert.ok(result.fieldErrors.name);
  }
});

test("rejects invalid email and invalid role", () => {
  const invalidEmail = validateWaitlistPayload({
    role: "client",
    email: "not-an-email",
    city: "DC",
    region: "District of Columbia",
  });
  assert.equal(invalidEmail.ok, false);
  const invalidRole = validateWaitlistPayload({
    role: "admin",
    email: "valid@example.com",
    city: "DC",
    region: "District of Columbia",
  });
  assert.equal(invalidRole.ok, false);
});

test("rejects overlong input", () => {
  const result = validateWaitlistPayload({
    role: "client",
    email: "valid@example.com",
    city: "x".repeat(101),
    region: "Maryland",
  });
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.fieldErrors.city ?? "", /100/);
});

test("rejects a filled honeypot without calling the database", async () => {
  let called = false;
  const result = await insertWaitlistEntry(
    { ...customer, website: "https://spam.example" },
    async () => {
      called = true;
      return { error: null };
    },
  );
  assert.equal(result.ok, false);
  assert.equal(called, false);
});

test("returns created after a successful insert", async () => {
  const result = await insertWaitlistEntry(customer, async () => ({ error: null }));
  assert.deepEqual(result, { ok: true, status: "created" });
});

test("treats duplicate inserts as existing", async () => {
  const result = await insertWaitlistEntry(customer, async () => ({
    error: { code: "23505" },
  }));
  assert.deepEqual(result, { ok: true, status: "existing" });
});

test("fails safely when server configuration is unavailable", async () => {
  const result = await insertWaitlistEntry(customer, null);
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.code, "CONFIG_ERROR");
});

test("returns a safe database failure", async () => {
  const original = console.error;
  console.error = () => {};
  try {
    const result = await insertWaitlistEntry(customer, async () => ({
      error: { code: "XX000", message: "private database detail" },
    }));
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.code, "DATABASE_ERROR");
      assert.doesNotMatch(result.message, /private database detail/);
    }
  } finally {
    console.error = original;
  }
});
