import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchApi } from '../client/fetch';
import { ApiMutationKey, ApiQueryKey } from '../constants';
import { useApiConfig } from '../context/ApiConfigContext';
import { createRecipeResponseSchema, type CreateRecipeRequest } from '../types';

/**
 * Hook to create a new recipe
 *
 * @returns React Query mutation object for creating a recipe
 */
export function useCreateRecipe() {
    const queryClient = useQueryClient();
    const { apiBaseUrl } = useApiConfig();

    return useMutation({
        mutationKey: [ApiMutationKey.CREATE_RECIPE],
        mutationFn: async (data: CreateRecipeRequest) => {
            return fetchApi(
                '/recipes',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                },
                createRecipeResponseSchema,
                apiBaseUrl,
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ApiQueryKey.RECIPES] });
        },
    });
}
