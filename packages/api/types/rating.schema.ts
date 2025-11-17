import { z } from 'zod';

/**
 * Schema for add rating response (POST /recipes/{recipeId}/ratings)
 */
export const addRatingResponseSchema = z.object({
    score: z.number().min(0).max(5),
    recipe: z.string(),
    id: z.string(),
});
