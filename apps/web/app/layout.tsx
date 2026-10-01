import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Template",
  description: "Next.js application shell using the shared design system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
