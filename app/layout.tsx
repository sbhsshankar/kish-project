import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "సందడి — Destination in Godavari",
  description: "Plan weddings, functions and unforgettable celebrations across beautiful Godavari destinations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="te">
      <body>{children}</body>
    </html>
  );
}
