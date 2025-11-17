import { useQuery } from '@tanstack/react-query';

import { SearchParamsBuilder } from '../builders/SearchParamsBuilder';
import { fetchApi } from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { useApiConfig } from '../context/ApiConfigContext';
import { recipeListSchema, type GetRecipesParams } from '../types';

/**
 * Hook to fetch all recipes
 */
export function useRecipes(params?: GetRecipesParams) {
    const { apiBaseUrl } = useApiConfig();

    return useQuery({
        queryKey: [ApiQueryKey.RECIPES, params, apiBaseUrl],
        queryFn: () => {
            const endpoint = new SearchParamsBuilder()
                .add('limit', params?.limit)
                .add('offset', params?.offset)
                .buildWithEndpoint('/recipes');

            return fetchApi(endpoint, { method: 'GET' }, recipeListSchema, apiBaseUrl);
        },
    });
}
