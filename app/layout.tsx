import type { Metadata } from "next";
import { Work_Sans, Noto_Serif_Ethiopic } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  variable: "--font-aden-serif",
  subsets: ["ethiopic", "latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adeneats.com"),
  title: {
    default: "Aden Eats — Home-cooked Habesha food, made by neighbors",
    template: "%s · Aden Eats",
  },
  description:
    "Aden Eats is bringing home-cooked Ethiopian and Eritrean food from vetted Habesha cooks to neighbors across the DMV. Join the launch waitlist.",
  openGraph: {
    type: "website",
    siteName: "Aden Eats",
    locale: "en_US",
    url: "https://adeneats.com",
    title: "Aden Eats — Home-cooked Habesha food, made by neighbors",
    description:
      "Home-cooked Habesha food is coming to the DMV. Meet Aden Eats and join the launch waitlist.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aden Eats — Home-cooked Habesha food, made by neighbors",
    description:
      "Home-cooked Habesha food is coming to the DMV. Meet Aden Eats and join the launch waitlist.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${notoSerifEthiopic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-teff text-injera font-body">
        {children}
      </body>
    </html>
  );
}
