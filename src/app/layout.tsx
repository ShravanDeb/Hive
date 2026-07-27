import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import NavigationProgress from "@/components/NavigationProgress";
import ThemeProvider from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Script from "next/script";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hive \u2013 Campus Project & Hackathon Collaboration Platform",
  description:
    "Join the hive. Find collaborators, build real projects, and hack together on campus.",
  keywords: ["Hive", "Project Collaboration", "Hackathons", "Student Portal", "Team Finder", "Campus"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} ${spaceGrotesk.variable} h-full`}
      style={{ fontFamily: "var(--font-body), system-ui, -apple-system, sans-serif" }}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-foreground">
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('hive-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <ThemeProvider>
          <SmoothScrollProvider>
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            <ErrorBoundary>{children}</ErrorBoundary>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
