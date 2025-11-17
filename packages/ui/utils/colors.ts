import { colors } from '../constants';

/**
 * Convert hex color to rgba with opacity
 *
 * @param hex - Hex color string (e.g., '#FF3B9D' or '#fff')
 * @param opacity - Opacity value between 0 and 1
 * @returns rgba color string
 */
export function hexToRgba(hex: string, opacity: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
        // Handle 3-digit hex
        const shortResult = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);

        if (shortResult) {
            const r = parseInt(shortResult[1] + shortResult[1], 16);
            const g = parseInt(shortResult[2] + shortResult[2], 16);
            const b = parseInt(shortResult[3] + shortResult[3], 16);

            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        return hex; // Return original if parsing fails
    }

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Semantic color utilities
 * These are commonly used color combinations derived from the base color palette
 */
export const colorUtils = {
    shadow: hexToRgba(colors.gray.dark, 0.1),
    overlay: hexToRgba(colors.white, 0.8),
    hoverBackground: colors.gray.lighter,
} as const;

