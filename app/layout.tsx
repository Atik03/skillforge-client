import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillforge.vercel.app"),
  title: {
    default: "SkillForge | Learn Without Limits",
    template: "%s | SkillForge",
  },
  description:
    "SkillForge is a modern online learning platform where students can discover expert-led courses, learn new skills, and grow their careers.",
  keywords: [
    "SkillForge",
    "Online Learning",
    "Courses",
    "Programming",
    "Education",
    "Next.js",
    "Learning Platform",
  ],
  applicationName: "SkillForge",
  authors: [
    {
      name: "SkillForge",
    },
  ],
  creator: "SkillForge",
  publisher: "SkillForge",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SkillForge",
    description:
      "Master new skills with expert-led online courses on SkillForge.",
    url: "https://skillforge.vercel.app",
    siteName: "SkillForge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkillForge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillForge",
    description:
      "Master new skills with expert-led online courses on SkillForge.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-base-100 text-base-content antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}