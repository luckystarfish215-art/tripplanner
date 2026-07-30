import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripsgen.app"),
  title: { default: "TripsGen — Travel, made personal", template: "%s | TripsGen" },
  description: "A thoughtful, personal way to plan your next journey.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "TripsGen",
    title: "TripsGen — Travel, made personal",
    description: "A thoughtful, personal way to plan your next journey.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
