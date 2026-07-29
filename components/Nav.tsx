import Link from "next/link";
import Container from "./Container";

export default function Nav({ appStoreUrl }: { appStoreUrl?: string }) {
  void appStoreUrl;
  return (
    <div className="sticky top-0 z-50 border-b border-injera/10">
      <nav className="bg-[rgb(18_11_8_/_0.82)] backdrop-blur-xl">
        <Container className="py-3 sm:flex sm:items-center sm:justify-between sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="group inline-flex min-h-11 items-center gap-3 font-display text-2xl font-semibold tracking-tight text-injera"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/45 font-ethiopic text-sm text-gold transition-transform group-hover:rotate-[-8deg]">አ</span>
              <span>Aden <em className="not-italic text-gold">Eats</em></span>
            </Link>
            <Link
              href="/#waitlist"
              className="inline-flex min-h-11 items-center rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-teff shadow-[0_8px_28px_rgb(226_169_59_/_0.22)] transition-transform hover:-translate-y-0.5"
            >
              Join the waitlist
            </Link>
          </div>
          <div className="mt-1 flex min-w-0 items-center gap-1 overflow-x-auto pb-1 sm:mt-0 sm:gap-2 sm:overflow-visible sm:pb-0">
            {[
              ["/#how", "How it works"],
              ["/#dishes", "Dishes"],
              ["/#culture", "Culture"],
              ["/cooks", "Cook with Aden"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm text-injera-dim transition-colors hover:bg-injera/5 hover:text-injera"
              >
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </nav>
    </div>
  );
}
