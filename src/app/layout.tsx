import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Lab 7 — i18n",
    description: "i18next + Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
        <body>{children}</body>
        </html>
    );
}