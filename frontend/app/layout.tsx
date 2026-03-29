import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerIQ AI — Created by Raja Abimanyu N",
  description: "Premium AI Career Intelligence Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
