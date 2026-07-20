import type { Metadata } from "next";
import { Fraunces, Work_Sans, Noto_Serif_Ethiopic } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
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
    "Aden Eats connects vetted Habesha home cooks with neighbors across the DMV for pickup ordering of authentic Ethiopian and Eritrean food.",
  openGraph: {
    type: "website",
    siteName: "Aden Eats",
    locale: "en_US",
    url: "https://adeneats.com",
    title: "Aden Eats — Home-cooked Habesha food, made by neighbors",
    description:
      "Vetted Habesha home cooks, real injera, real home kitchens. Order ahead, pick up hot across the DMV.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aden Eats — Home-cooked Habesha food, made by neighbors",
    description:
      "Vetted Habesha home cooks, real injera, real home kitchens. Order ahead, pick up hot across the DMV.",
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
      className={`${fraunces.variable} ${workSans.variable} ${notoSerifEthiopic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-teff text-injera font-body">
        {children}
      </body>
    </html>
  );
}
