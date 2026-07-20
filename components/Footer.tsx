import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-wrap items-center justify-between gap-5 text-sm text-injera-dim">
        <div>© 2026 Aden Community Ventures LLC</div>
        <nav className="flex gap-6">
          <a
            href="https://instagram.com/adeneatsdmv"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-injera"
          >
            Instagram
          </a>
          <Link href="/privacy" className="transition-colors hover:text-injera">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-injera">
            Terms
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
