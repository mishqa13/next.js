export const LANGUAGES = ["ru", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

export const FALLBACK_LANG: Language = "ru";
export const DEFAULT_NS = "common";
export const COOKIE_NAME = "i18next";
export const HEADER_NAME = "x-language";