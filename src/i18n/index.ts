import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { LANGUAGES, FALLBACK_LANG, DEFAULT_NS } from "./config";

i18next
    .use(
        resourcesToBackend((language: string, namespace: string) => {
            return import(`../locales/${language}/${namespace}.json`);
        })
    )
    .init({
        supportedLngs: LANGUAGES,
        fallbackLng: FALLBACK_LANG,
        lng: FALLBACK_LANG,
        fallbackNS: DEFAULT_NS,
        defaultNS: DEFAULT_NS,
        contextSeparator: ".",
        returnObjects: true,
        preload: typeof window === "undefined" ? [...LANGUAGES] : [],
    });

export default i18next;