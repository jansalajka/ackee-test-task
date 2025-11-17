import type { TranslationKey } from '~modules/trans/hooks/useTrans';
import { csTranslations } from '~modules/trans/translations/cs';

/**
 * Real translation function for Storybook using actual translations
 */
export const realTranslate = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = csTranslations[key] || key;
    
    if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
            translation = translation.replace(`{${paramKey}}`, String(paramValue));
        });
    }
    
    return translation;
};

/**
 * Mock getRecipeImage function for Storybook
 */
export const mockGetRecipeImage = (recipeId: string): string => {
    return `https://picsum.photos/seed/${recipeId}/200/200`;
};

/**
 * Mock convertScoreToStars function for Storybook
 */
export const mockConvertScoreToStars = (score: number): number => {
    const stars = Math.round((score / 100) * 5);
    return Math.max(0, Math.min(5, stars));
};

