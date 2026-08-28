import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaptopsAnytime — Higher Education Demo",
  description:
    "Internal AEO architecture demonstration for LaptopsAnytime. Not the live site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
