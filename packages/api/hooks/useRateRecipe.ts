import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchApi } from '../client/fetch';
import { ApiMutationKey, ApiQueryKey } from '../constants';
import { useApiConfig } from '../context/ApiConfigContext';
import { addRatingResponseSchema, type AddRatingRequest } from '../types';

export function useRateRecipe() {
    const queryClient = useQueryClient();
    const { apiBaseUrl } = useApiConfig();

    return useMutation({
        mutationKey: [ApiMutationKey.ADD_RATING],
        mutationFn: async ({ recipeId, data }: { recipeId: string; data: AddRatingRequest }) => {
            return fetchApi(
                `/recipes/${recipeId}/ratings`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                },
                addRatingResponseSchema,
                apiBaseUrl,
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [ApiQueryKey.RECIPE, variables.recipeId] });
            queryClient.invalidateQueries({ queryKey: [ApiQueryKey.RECIPES] });
        },
    });
}
