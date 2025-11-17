import { translations } from '@workspace/localization';

import { useLang } from './useLang';

/**
 * Hook to get translations for the current language
 *
 * @returns Tuple of [language, translations object]
 */
export function useTranslations() {
    const lang = useLang();
    const messages = translations[lang];

    return [lang, messages] as const;
}
