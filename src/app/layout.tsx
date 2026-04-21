import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab 6 — Validation",
  description: "React Hook Form + Yup",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ru">
      <body>{children}</body>
      </html>
  );
}