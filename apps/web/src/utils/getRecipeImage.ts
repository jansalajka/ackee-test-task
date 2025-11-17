/**
 * Get a placeholder recipe image based on a seed (e.g., recipe ID)
 * This ensures the same recipe always gets the same image
 * Uses Picsum Photos API with food category for deterministic food images
 *
 * @param seed - Seed value to determine which image to use (e.g., recipe ID)
 * @returns URL to a placeholder recipe image
 */
export function getRecipeImage(seed: string): string {
    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);

        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    const imageId = Math.abs(hash) % 1000;

    return `https://picsum.photos/seed/food-${imageId}/800/600`;
}

