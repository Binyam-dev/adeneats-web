"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import SceneHeading from "./SceneHeading";

export default function HumanPayoffScene() {
  const reduced = useReducedMotion();

  return (
    <section className="cinematic-scene relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_22%_50%,rgb(226_169_59_/_0.12),transparent_34%),radial-gradient(circle_at_80%_38%,rgb(196_59_30_/_0.15),transparent_32%)]" />
      <Container className="relative">
        <SceneHeading
          chapter="05–07"
          eyebrow="The human payoff"
          title={<>One meal. <em className="text-gold">Two happy homes.</em></>}
          body="A local cook earns from what she loves doing. A customer enjoys authentic food made with care. Aden Eats brings them together."
        />
        <div className="relative mt-16 grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={reduced ? false : { opacity: 0, x: -30, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-[2.2rem] border border-gold/20 bg-teff-panel p-8 sm:p-10"
          >
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[1.4rem] border border-injera/10">
              <Image
                src="/images/cooks/portrait.webp"
                alt="A local Ethiopian home cook smiling in her kitchen"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className="object-cover object-center transition-transform duration-500 hover:scale-105 motion-reduce:hover:scale-100"
              />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Cook’s home · demonstration</p>
            <h3 className="mt-5 font-display text-4xl text-injera">Cook what you love.</h3>
            <p className="mt-3 max-w-md text-injera-dim">Earn from your talent. Build within your community.</p>
            <motion.div
              className="mt-10 rounded-2xl border border-injera/10 bg-teff-panel-2 p-5 shadow-2xl"
              animate={reduced ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.14em] text-injera-dim">Visual example</span>
                  <p className="mt-1 font-semibold text-injera">Order completed</p>
                </div>
                <strong className="font-display text-3xl text-gold">$32.50</strong>
              </div>
              <p className="mt-3 text-xs text-injera-dim">Example payout display only—not a live transaction or earnings promise.</p>
            </motion.div>
            <Link href="/cooks#waitlist" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-teff">
              Join the cook waitlist
            </Link>
          </motion.article>

          <motion.article
            initial={reduced ? false : { opacity: 0, x: 30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-[2.2rem] border border-berbere/25 bg-[linear-gradient(145deg,var(--color-berbere-deep),var(--color-teff-panel-2))] p-8 sm:p-10"
          >
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[1.4rem] border border-injera/10">
              <Image
                src="/images/dishes/beyaynetu.webp"
                alt="A colorful Ethiopian beyaynetu meal arranged on injera"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:hover:scale-100"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgb(17_11_8_/_0.35))]" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Customer’s home · demonstration</p>
            <h3 className="mt-5 max-w-[12ch] font-display text-4xl text-injera">Open the lid. Let the room change.</h3>
            <p className="mt-4 max-w-md text-injera-dim">Steam rises. Injera is torn. The first bite becomes a thank-you sent back to the cook.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Container opens", "Steam rises", "The table gathers", "Thank you, Almaz"].map((item, index) => (
                <motion.span
                  key={item}
                  initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-full border border-injera/15 bg-injera/[0.07] px-4 py-2 text-sm text-injera"
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <Link href="/#waitlist" className="mt-8 inline-flex min-h-12 items-center rounded-full border border-injera/30 px-6 font-bold text-injera">
              Be first at the table
            </Link>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
