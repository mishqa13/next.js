"use client";

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES, FALLBACK_LANG, DEFAULT_NS } from "./config";

const i18nClient = i18next.createInstance();

i18nClient
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend((language: string, namespace: string) => {
            return import(`../locales/${language}/${namespace}.json`);
        })
    )
    .init({
        supportedLngs: LANGUAGES,
        fallbackLng: FALLBACK_LANG,
        lng: undefined,
        fallbackNS: DEFAULT_NS,
        defaultNS: DEFAULT_NS,
        contextSeparator: ".",
        returnObjects: true,
        detection: {
            order: ["path", "htmlTag", "cookie", "navigator"],
        },
    });

export { i18nClient };

export function useT(ns?: string, options = {}) {
    const lang = useParams().lang;

    if (typeof lang !== "string") {
        throw new Error("useT is only available inside [lang]");
    }

    const [activeLng, setActiveLng] = useState(i18nClient.resolvedLanguage);

    useEffect(() => {
        if (activeLng === i18nClient.resolvedLanguage) return;
        setActiveLng(i18nClient.resolvedLanguage);
    }, [activeLng]);

    useEffect(() => {
        if (!lang || i18nClient.resolvedLanguage === lang) return;
        i18nClient.changeLanguage(lang);
    }, [lang]);

    return useTranslation(ns, { ...options, i18n: i18nClient });
}