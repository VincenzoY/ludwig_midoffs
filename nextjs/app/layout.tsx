import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import InfoButton from "@/components/InfoButton/InfoButton";
import Script from "next/script";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jerkoffs 2026",
  icons: {
    icon: "/gold_ingot.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script defer src="https://umami.vyee.ca/script.js" data-website-id="cfcf5715-fecf-455b-a817-95e6d2b39efc" />
      </head>
      <body className={`${rubik.variable} antialiased`}>
        <div className="bg-zinc-200 dark:bg-zinc-900 min-h-screen h-full">
          <Providers>
            <InfoButton />
            {children}
            <footer className="py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
              made by{" "}
              <a
                href="https://x.com/vincen2o_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-700 dark:hover:text-zinc-200 underline"
              >
                @yuyu
              </a>{" "}
              / vincen2o_ on Twitch.
            </footer>
          </Providers>
        </div>
      </body>
    </html>
  );
}
