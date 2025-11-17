import type { z } from 'zod';

import type {
    createRecipeResponseSchema,
    recipeDetailSchema,
    recipeListItemSchema,
    recipeListSchema,
    updateRecipeResponseSchema,
} from './recipe.schema';

/**
 * Request body for creating a new recipe (POST /recipes)
 */
export interface CreateRecipeRequest {
    name: string;
    description?: string;
    ingredients?: string[];
    duration: number;
    info?: string;
}

/**
 * Request body for updating a recipe (PUT /recipes/{recipeId})
 * All fields are optional as it's a partial update
 */
export interface UpdateRecipeRequest {
    name?: string;
    description?: string;
    ingredients?: string[];
    duration?: number;
    info?: string;
}

/**
 * Response types inferred from Zod schemas
 */
export type RecipeListItem = z.infer<typeof recipeListItemSchema>;
export type RecipeList = z.infer<typeof recipeListSchema>;
export type RecipeDetail = z.infer<typeof recipeDetailSchema>;
export type CreateRecipeResponse = z.infer<typeof createRecipeResponseSchema>;
export type UpdateRecipeResponse = z.infer<typeof updateRecipeResponseSchema>;

/**
 * Query parameters for GET /recipes
 */
export interface GetRecipesParams {
    limit?: number;
    offset?: number;
}
