import type { z } from 'zod';

import type { addRatingResponseSchema } from './rating.schema';

/**
 * Request body for adding a rating to a recipe (POST /recipes/{recipeId}/ratings)
 */
export interface AddRatingRequest {
    score: number; // 0 to 5
}

/**
 * Response from adding a rating (POST /recipes/{recipeId}/ratings)
 */
export type AddRatingResponse = z.infer<typeof addRatingResponseSchema>;
