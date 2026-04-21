import type { Metadata } from "next";
import { LANGUAGES } from "@/i18n/config";

export async function generateStaticParams() {
    return LANGUAGES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
    title: "Lab 7 — i18n",
};

export default function LangLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}