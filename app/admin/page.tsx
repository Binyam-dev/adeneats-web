import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import AdminWorkspace from "@/components/AdminWorkspace";

export const metadata: Metadata = {
  title: "Kitchen desk",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 py-16 sm:py-20">
        <Container>
          <AdminWorkspace />
        </Container>
      </main>
      <Footer />
    </>
  );
}
