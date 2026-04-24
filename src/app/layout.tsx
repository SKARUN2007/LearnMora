import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Learnmora - Premier Professional Course Ecosystem",
    default: "Learnmora | The Global Index for Professional Certificates & Degrees",
  },
  description: "Aggregating the world's best courses from Coursera, Udemy, Harvard, MIT, and more. Track your learning, analyze your resume, and build your career roadmap with AI.",
  keywords: ["online courses", "professional certificates", "career roadmap", "resume analyzer", "free courses", "university degrees"],
  openGraph: {
    title: "Learnmora | Global Professional Course Ecosystem",
    description: "Build your future with verified credentials from top universities and tech giants.",
    type: "website",
    siteName: "Learnmora",
  },
};

import CareerMentor from "@/components/ai/CareerMentor";
import ComparisonEngine from "@/components/courses/ComparisonEngine";
import FollowModal from "@/components/ui/FollowModal";

import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${inter.variable} ${geistMono.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>
        <UserProvider>
          <Navbar />
          <div className="layout-content">
            <div className="ad-container-top">
              {/* AdSense Top Leaderboard */}
              <div className="ad-placeholder">Leaderboard Ad Slot</div>
            </div>
            <main>{children}</main>
          </div>
          <Footer />
          <CareerMentor />
          <ComparisonEngine />
          <FollowModal />
        </UserProvider>
      </body>
    </html>
  );
}
