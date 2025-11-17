import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '../client/fetch';
import { ApiMutationKey, ApiQueryKey } from '../constants';
import { useApiConfig } from '../context/ApiConfigContext';
import { updateRecipeResponseSchema, type UpdateRecipeRequest } from '../types';

/**
 * Hook to update an existing recipe
 *
 * @returns React Query mutation object for updating a recipe
 */
export function useUpdateRecipe() {
    const queryClient = useQueryClient();
    const { apiBaseUrl } = useApiConfig();

    return useMutation({
        mutationKey: [ApiMutationKey.UPDATE_RECIPE],
        mutationFn: async ({ recipeId, data }: { recipeId: string; data: UpdateRecipeRequest }) => {
            return fetchApi(
                `/recipes/${recipeId}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                },
                updateRecipeResponseSchema,
                apiBaseUrl,
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [ApiQueryKey.RECIPE, variables.recipeId] });
            queryClient.invalidateQueries({ queryKey: [ApiQueryKey.RECIPES] });
        },
    });
}
