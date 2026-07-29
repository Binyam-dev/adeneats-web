import Container from "./Container";
import Reveal from "./Reveal";
import TibebBand from "./TibebBand";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <>
      <TibebBand />
      <section id="waitlist" className="py-24 text-center">
        <Container>
          <Reveal>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Coming to your city
            </div>
            <h2 className="font-display text-display-lg text-injera">
              Not in the DMV yet?
            </h2>
            <p className="mx-auto mt-3.5 max-w-[56ch] text-injera-dim">
              We&apos;re starting in DC, Maryland, and Virginia. Aden
              Eats is built for every Habesha community in America. Tell us
              where you are and we&apos;ll let you know the moment we
              arrive.
            </p>
            <div className="mx-auto max-w-[520px]">
              <WaitlistForm role="client" />
            </div>
            <p className="mt-4 text-sm text-injera-dim">
              Cooks are welcome too.{" "}
              <a href="/cooks" className="text-teal underline underline-offset-2">
                tell us your city
              </a>{" "}
              and we&apos;ll reach out first.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
