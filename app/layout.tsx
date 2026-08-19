import type { Metadata } from "next";
import { headers } from "next/headers";

import { resolveBrandRootFromHeader } from "@hebbian/dna";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hebbian app",
  description: "Next.js starter with @hebbian/dna branding.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawBrandRoot = (await headers()).get("x-brand-root");
  const brandRoot = resolveBrandRootFromHeader(rawBrandRoot);

  return (
    <html lang="sv" data-brand-root={brandRoot}>
      <body data-genome="branding">{children}</body>
    </html>
  );
}
