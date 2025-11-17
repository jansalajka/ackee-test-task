import { useLocale } from './useLocale';

/**
 * Hook to get the current language code from locale
 * Parses locale that can be in `en-US` or `en` format and returns the language part
 *
 * @returns The language code (e.g., 'en' from 'en-US')
 */
export function useLang() {
    const locale = useLocale();

    return locale.lang;
}
