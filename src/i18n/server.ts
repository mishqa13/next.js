import { headers as _headers } from "next/headers";
import i18next from "./index";
import { HEADER_NAME } from "./config";

export async function getT(
    ns?: string | string[],
    lang?: string | null,
    keyPrefix?: string
) {
    const headers = await _headers();
    const language = lang || headers.get(HEADER_NAME);

    if (language && i18next.resolvedLanguage !== language) {
        await i18next.changeLanguage(language);
    }

    if (ns && !i18next.hasLoadedNamespace(ns)) {
        await i18next.loadNamespaces(ns);
    }

    return {
        t: i18next.getFixedT(
            language ?? i18next.resolvedLanguage!,
            ns ?? null,
            keyPrefix
        ),
        i18n: i18next,
    };
}