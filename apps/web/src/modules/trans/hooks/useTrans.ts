import { useMemo } from 'react';

import { csTranslations } from '../translations/cs';

type TranslationKey = keyof typeof csTranslations;

/**
 * Translation hook that returns a translate function
 *
 * @returns Object with translate function for translating keys with optional parameters
 */
export function useTrans() {
    const translations = useMemo(() => {
        return csTranslations;
    }, []);

    /**
     * Translates a key to its corresponding string value
     *
     * @param key - Translation key
     * @param params - Optional parameters to replace placeholders in the translation (e.g., {name: 'John'})
     * @returns Translated string with parameters replaced
     */
    const translate = (key: TranslationKey | string, params?: Record<string, string | number>): string => {
        const translationKey = key as TranslationKey;
        let translation: string = translations[translationKey] || key;

        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                translation = translation.replace(`{${paramKey}}`, String(paramValue));
            });
        }

        return translation;
    };

    return { translate };
}

