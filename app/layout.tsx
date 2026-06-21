import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AgeGate } from "@/components/AgeGate";
import { AppShell } from "@/components/AppShell";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "Drink&Chill",
  description: "面向年轻职场人的酒类探索与心情管理平台。",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Drink&Chill",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ServiceWorkerRegistrar />
        <AgeGate />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
