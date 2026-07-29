"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { kitchenSteps } from "@/data/cinematic";
import Container from "@/components/Container";
import SceneHeading from "./SceneHeading";

export default function CookStoryScene() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [reduced ? "0%" : "-6%", reduced ? "0%" : "7%"]);

  return (
    <section ref={section} id="cook-story" className="cinematic-scene relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgb(196_59_30_/_0.18),transparent_38%)]" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SceneHeading
              chapter="03"
              eyebrow="A cook’s kitchen"
              title={<>Recipes carried forward. <em className="text-gold">Prepared today.</em></>}
              body="The cook portrait and story below are demonstration content for the pre-launch experience, not a claim about a currently active Aden cook."
            />
            <div className="mt-10 rounded-[1.5rem] border border-gold/20 bg-gold/[0.06] p-6">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Demonstration profile</span>
              <h3 className="mt-2 font-display text-3xl text-injera">Meet Almaz</h3>
              <p className="mt-2 text-injera-dim">Cooking family recipes in Silver Spring.</p>
              <Link href="/cooks#waitlist" className="mt-5 inline-flex min-h-12 items-center font-bold text-gold">
                Bring your recipes to Aden <span className="ml-2">↗</span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[42rem]">
            <motion.div
              style={{ y: photoY }}
              className="absolute inset-x-0 top-0 h-[34rem] overflow-hidden rounded-[2.5rem] border border-injera/10 shadow-[0_40px_120px_rgb(0_0_0_/_0.48)] sm:left-10"
            >
              <Image
                src="/images/cooks/portrait.webp"
                alt="Demonstration portrait representing a prospective Aden Eats home cook"
                fill
                sizes="(max-width: 1024px) 92vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(20_12_8_/_0.9)_100%)]" />
              <div className="absolute inset-x-7 bottom-7">
                <p className="font-ethiopic text-xl text-gold">በፍቅር የተዘጋጀ</p>
                <p className="mt-1 text-sm text-injera-dim">Prepared with care.</p>
              </div>
            </motion.div>
            <ol className="absolute inset-x-0 bottom-0 grid gap-2 sm:left-auto sm:w-[72%]">
              {kitchenSteps.map((step, index) => (
                <motion.li
                  key={step}
                  initial={reduced ? false : { opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: index * 0.06 }}
                  className="flex min-h-14 items-center gap-4 rounded-2xl border border-injera/10 bg-[rgb(28_18_13_/_0.9)] px-5 shadow-xl backdrop-blur-md"
                >
                  <span className="font-display text-sm text-gold">0{index + 1}</span>
                  <span className="text-sm font-semibold text-injera">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
