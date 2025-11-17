import { z } from 'zod';

/**
 * Base recipe schema - used as foundation for other recipe schemas
 */
export const recipeSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    ingredients: z.array(z.string()).optional(),
    duration: z.number(),
    info: z.string().optional(),
    score: z.number(),
});

/**
 * Schema for recipe list item (GET /recipes)
 */
export const recipeListItemSchema = z.object({
    name: z.string(),
    duration: z.number(),
    id: z.string(),
    score: z.number(),
});

/**
 * Schema for recipe list response (GET /recipes) - array of recipe list items
 */
export const recipeListSchema = z.array(recipeListItemSchema);

/**
 * Schema for recipe detail (GET /recipes/{recipeId})
 */
export const recipeDetailSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    duration: z.number(),
    info: z.string(),
    score: z.number(),
});

/**
 * Schema for create recipe response (POST /recipes)
 */
export const createRecipeResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    duration: z.number(),
    info: z.string().optional(),
    score: z.number().optional().default(0),
});

/**
 * Schema for update recipe response (PUT /recipes/{recipeId})
 * Fake API returns only updated fields, so all fields are optional except id
 */
export const updateRecipeResponseSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    ingredients: z.array(z.string()).optional(),
    duration: z.number().optional(),
    info: z.string().optional(),
    score: z.number().optional().default(0),
});
