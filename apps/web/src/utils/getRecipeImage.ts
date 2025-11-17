const RECIPE_IMAGES = [
    '/image/recipe-1.png',
    '/image/recipe-2.png',
    '/image/recipe-3.png',
] as const;

/**
 * Get a random recipe image based on a seed (e.g., recipe ID)
 * This ensures the same recipe always gets the same image
 *
 * @param seed - Seed value to determine which image to use (e.g., recipe ID)
 * @returns Path to a recipe image
 */
export function getRecipeImage(seed: string): string {
    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);

        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    const index = Math.abs(hash) % RECIPE_IMAGES.length;

    return RECIPE_IMAGES[index] || RECIPE_IMAGES[0];
}

