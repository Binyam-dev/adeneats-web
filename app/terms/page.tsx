import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of Aden Eats.",
};

export default function TermsPage() {
  return (
    <>
      <Nav appStoreUrl={process.env.APP_STORE_URL} />
      <main className="flex-1 py-20">
        <Container className="max-w-[72ch]">
          <h1 className="text-display-lg font-display text-injera">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-injera-dim">
            Last updated — July 27, 2026
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-berbere">
            Draft — pending legal review before launch
          </p>

          <div className="mt-10 space-y-9 text-[0.95rem] leading-relaxed text-injera-dim [&_h2]:mb-3 [&_h2]:mt-0 [&_h2]:text-display-md [&_h2]:font-display [&_h2]:text-injera [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            <p>
              These terms govern your use of adeneats.com and, once
              available, the Aden Eats mobile app (together, the
              &quot;Service&quot;), operated by Aden Community Ventures LLC
              (&quot;Aden,&quot; &quot;we,&quot; &quot;us&quot;). By joining
              the waitlist, applying to cook, or otherwise using the Service,
              you agree to these terms.
            </p>

            <section>
              <h2>What Aden Eats is</h2>
              <p>
                Aden Eats is a marketplace that connects independent Habesha
                home cooks with neighbors in the DC, Maryland, and Virginia
                area for pickup ordering of home-cooked Ethiopian and
                Eritrean food. Today, adeneats.com is a pre-launch site: it
                collects waitlist signups and cook applications, but it does
                not process orders or payments. Ordering, menus, and payments
                will live in the Aden Eats mobile app once it launches.
              </p>
            </section>

            <section>
              <h2>The waitlist</h2>
              <p>
                Joining the customer or cook waitlist means giving us
                accurate contact information so we can reach you as we open
                onboarding in your city. You can ask us to remove your
                information from the waitlist at any time by emailing{" "}
                <a
                  href="mailto:hello@adeneats.com"
                  className="text-teal underline underline-offset-2"
                >
                  hello@adeneats.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2>Cooks</h2>
              <p>
                Cooks who apply and are approved operate as independent
                cooks — not employees, contractors, or agents of Aden. Each
                cook is solely responsible for meeting their state&apos;s
                home-kitchen or cottage food requirements, basic food-handler
                practices, and accurate labeling of ingredients and
                allergens, as described on our{" "}
                <a href="/cooks" className="text-teal underline underline-offset-2">
                  Cook with Aden
                </a>{" "}
                page. Aden&apos;s review process confirms a baseline before a
                cook&apos;s first order — it is not a guarantee of food
                safety or quality for any individual order.
              </p>
              <p>
                Once ordering is live, cooks keep 85% of every order and 100%
                of tips; there is no fee to apply or to join.
              </p>
            </section>

            <section>
              <h2>Acceptable use</h2>
              <ul>
                <li>Provide accurate information when you sign up or apply.</li>
                <li>
                  Don&apos;t misuse the Service — no scraping, no interfering
                  with its operation, no impersonating another person or
                  cook.
                </li>
                <li>
                  Don&apos;t use the Service for anything unlawful or that
                  puts another user&apos;s safety at risk.
                </li>
              </ul>
            </section>

            <section>
              <h2>Intellectual property</h2>
              <p>
                The Aden Eats name, logo, the tibeb pattern design, and the
                site&apos;s content belong to Aden Community Ventures LLC.
                You may not use them without our permission.
              </p>
            </section>

            <section>
              <h2>Disclaimers and liability</h2>
              <p>
                The Service is provided &quot;as is.&quot; To the fullest
                extent permitted by law, Aden disclaims liability for the
                preparation, handling, and safety of food made by
                independently operating cooks, and for any indirect or
                consequential damages arising from use of the Service. This
                does not limit any liability that cannot be limited under
                applicable law.
              </p>
            </section>

            <section>
              <h2>Changes to these terms</h2>
              <p>
                We may update these terms as the Service evolves, especially
                once ordering and payments move into the app. We&apos;ll
                update the date at the top of this page when we do —
                continuing to use the Service after a change means you
                accept the update.
              </p>
            </section>

            <section>
              <h2>Governing law</h2>
              <p>
                These terms are governed by the laws of the State of
                Maryland, without regard to conflict-of-law rules.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                Questions about these terms? Email{" "}
                <a
                  href="mailto:hello@adeneats.com"
                  className="text-teal underline underline-offset-2"
                >
                  hello@adeneats.com
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
