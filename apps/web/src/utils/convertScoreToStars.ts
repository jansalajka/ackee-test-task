/**
 * Convert score from 0-100 range to 0-5 stars
 *
 * @param score - Score in range 0-100
 * @param totalStars - Total number of stars (default: 5)
 * @returns Number of filled stars (0-totalStars)
 */
export function convertScoreToStars(score: number, totalStars = 5): number {
    const stars = Math.round((score / 100) * totalStars);

    return Math.max(0, Math.min(totalStars, stars));
}

