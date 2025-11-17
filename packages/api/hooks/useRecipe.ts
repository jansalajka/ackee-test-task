import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { useApiConfig } from '../context/ApiConfigContext';
import { recipeDetailSchema } from '../types';

/**
 * Hook to fetch a single recipe by ID
 *
 * @param recipeId - The ID of the recipe to fetch (undefined to disable query)
 * @returns React Query object with recipe data
 */
export function useRecipe(recipeId: string | undefined) {
    const { apiBaseUrl } = useApiConfig();

    return useQuery({
        queryKey: [ApiQueryKey.RECIPE, recipeId, apiBaseUrl],
        queryFn: () => {
            if (!recipeId) {
                throw new Error('Recipe ID is required');
            }
            const endpoint = `/recipes/${recipeId}`;

            return fetchApi(endpoint, { method: 'GET' }, recipeDetailSchema, apiBaseUrl);
        },
        enabled: Boolean(recipeId),
    });
}
