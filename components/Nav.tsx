import Link from "next/link";
import Container from "./Container";
import TibebBand from "./TibebBand";

export default function Nav({ appStoreUrl }: { appStoreUrl?: string }) {
  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-teff/90 backdrop-blur-md">
        <Container className="py-3 sm:flex sm:items-center sm:justify-between sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-display text-2xl font-semibold tracking-tight text-injera"
            >
              Aden<span className="text-teal"> Eats</span>
            </Link>
            <Link
              href={appStoreUrl || "/#waitlist"}
              target={appStoreUrl ? "_blank" : undefined}
              rel={appStoreUrl ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-11 items-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-injera shadow-[0_6px_24px_rgb(29_158_117_/_0.3)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-teal-deep"
            >
              Get the app
            </Link>
          </div>
          <div className="mt-1 flex min-w-0 items-center gap-1 overflow-x-auto pb-1 sm:mt-0 sm:gap-2 sm:overflow-visible sm:pb-0">
            {[
              ["/#how", "How it works"],
              ["/#dishes", "Dishes"],
              ["/order", "Order"],
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
      <TibebBand animateOnMount />
    </div>
  );
}
