import { useMemo } from 'react';

import { csTranslations } from '../translations/cs';

type TranslationKey = keyof typeof csTranslations;

/**
 * Translation hook that returns a translate function
 */
export function useTrans() {
    const translations = useMemo(() => {
        return csTranslations;
    }, []);

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

