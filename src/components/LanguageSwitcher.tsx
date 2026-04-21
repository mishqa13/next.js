"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { LANGUAGES, type Language } from "@/i18n/config";

const labels: Record<Language, string> = {
    ru: "RU",
    en: "EN",
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const currentLang = params.lang as Language;

    const switchLang = (lang: Language) => {
        const segments = pathname.split("/");
        segments[1] = lang;
        router.push(segments.join("/"));
    };

    return (
        <div className="lang-switcher">
            {LANGUAGES.map((lang) => (
                <button
                    key={lang}
                    onClick={() => switchLang(lang)}
                    className={`lang-btn ${currentLang === lang ? "lang-btn--active" : ""}`}
                >
                    {labels[lang]}
                </button>
            ))}
        </div>
    );
}