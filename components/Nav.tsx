import Link from "next/link";
import Container from "./Container";
import TibebBand from "./TibebBand";

export default function Nav({ appStoreUrl }: { appStoreUrl?: string }) {
  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-teff/90 backdrop-blur-md">
        <Container className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tight text-injera"
          >
            Aden<span className="text-teal"> Eats</span>
          </Link>
          <div className="flex items-center gap-7">
            <Link
              href="/#how"
              className="hidden text-sm text-injera-dim transition-colors hover:text-injera sm:inline"
            >
              How it works
            </Link>
            <Link
              href="/#dishes"
              className="hidden text-sm text-injera-dim transition-colors hover:text-injera sm:inline"
            >
              The dishes
            </Link>
            <Link
              href="/cooks"
              className="hidden text-sm text-injera-dim transition-colors hover:text-injera sm:inline"
            >
              Cook with Aden
            </Link>
            <Link
              href={appStoreUrl || "/#waitlist"}
              target={appStoreUrl ? "_blank" : undefined}
              rel={appStoreUrl ? "noopener noreferrer" : undefined}
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-injera shadow-[0_6px_24px_rgb(29_158_117_/_0.35)] transition-transform hover:-translate-y-0.5"
            >
              Get the app
            </Link>
          </div>
        </Container>
      </nav>
      <TibebBand animateOnMount />
    </div>
  );
}
