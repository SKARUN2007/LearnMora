import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | LearnMora Ai - Premier Professional Course Ecosystem",
    default: "LearnMora Ai | The Global Index for Professional Certificates & Degrees",
  },
  description: "Aggregating the world's best courses from Coursera, Udemy, Harvard, MIT, and more. Track your learning, analyze your resume, and build your career roadmap with AI.",
  keywords: ["online courses", "professional certificates", "career roadmap", "resume analyzer", "free courses", "university degrees"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://learnmora.com'),
  openGraph: {
    title: "LearnMora Ai | Global Professional Course Ecosystem",
    description: "Build your future with verified credentials from top universities and tech giants.",
    type: "website",
    siteName: "LearnMora Ai",
  },
};

import CareerMentor from "@/components/ai/CareerMentor";
import ComparisonEngine from "@/components/courses/ComparisonEngine";
import FollowModal from "@/components/ui/FollowModal";

import { UserProvider } from "@/context/UserContext";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          <Navbar />
          <div className="layout-content">
            <div className="ad-container-top">
              {/* AdSense Leaderboard — renders real ads when pub ID is configured */}
              <ins
                className="adsbygoogle ad-leaderboard"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXX"
                data-ad-slot="1234567890"
                data-ad-format="horizontal"
                data-full-width-responsive="true"
              ></ins>
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

