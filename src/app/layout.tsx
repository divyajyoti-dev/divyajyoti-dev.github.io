import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Divya Jyoti",
  description:
    "Software Engineer & AI/Data Masters Student at UC Berkeley. 3+ years at UBS. Seeking Summer 2026 internships.",
  keywords: ["Divya Jyoti", "Software Engineer", "UC Berkeley", "MIMS", "AI", "Data Engineering"],
  authors: [{ name: "Divya Jyoti" }],
  openGraph: {
    title: "Divya Jyoti",
    description: "Software Engineer & AI/Data Masters Student at UC Berkeley.",
    type: "website",
    url: "https://divyajyoti-dev.github.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divya Jyoti",
    description: "Software Engineer & AI/Data Masters Student at UC Berkeley.",
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
      className={`${bricolage.variable} ${jakarta.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
