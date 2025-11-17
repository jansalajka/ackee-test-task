import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchApi } from '../client/fetch';
import { ApiMutationKey, ApiQueryKey } from '../constants';
import { useApiConfig } from '../context/ApiConfigContext';

/**
 * Hook to delete a recipe
 */
export function useDeleteRecipe() {
    const queryClient = useQueryClient();
    const { apiBaseUrl } = useApiConfig();

    return useMutation({
        mutationKey: [ApiMutationKey.DELETE_RECIPE],
        mutationFn: async (recipeId: string) => {
            await fetchApi(`/recipes/${recipeId}`, { method: 'DELETE' }, undefined, apiBaseUrl);
        },
        onSuccess: (_, recipeId) => {
            queryClient.removeQueries({ queryKey: [ApiQueryKey.RECIPE, recipeId] });
            queryClient.invalidateQueries({ queryKey: [ApiQueryKey.RECIPES] });
        },
    });
}
