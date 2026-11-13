import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Noto_Sans_TC } from "next/font/google";
import { ProgressProvider } from "@/context/ProgressContext";
import { AuthProvider } from "@/context/AuthContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  // CJK fonts ship as many unicode-range slices — preloading causes subset errors
  preload: false,
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "IAC 音樂製作課程 — 從音樂基礎到完整音樂製作",
    template: "%s | IAC 音樂製作課程",
  },
  description:
    "IAC Music Education System — 由零開始的 Practical Music Production System：節奏、樂理、作曲、Logic Pro、編曲與混音，五個系列配合互動練習。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${grotesk.variable} ${plexMono.variable} ${notoTC.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
        <ProgressProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
