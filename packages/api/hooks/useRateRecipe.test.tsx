import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as fetchModule from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { ApiConfigProvider } from '../context/ApiConfigContext';
import { useRateRecipe } from './useRateRecipe';

vi.mock('../client/fetch');

describe('useRateRecipe', () => {
    const mockApiBaseUrl = 'https://api.example.com';
    const mockRecipeId = 'recipe-123';
    const mockRatingData = {
        score: 4,
    };

    const mockResponseData = {
        score: 4,
        recipe: mockRecipeId,
        id: 'rating-123',
    };

    const createWrapper = (apiBaseUrl: string = mockApiBaseUrl) => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        return ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                <ApiConfigProvider apiBaseUrl={apiBaseUrl}>{children}</ApiConfigProvider>
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should rate recipe with correct data', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockResponseData);

        const { result } = renderHook(() => useRateRecipe(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync({ recipeId: mockRecipeId, data: mockRatingData });

        expect(mockFetchApi).toHaveBeenCalledWith(
            `/recipes/${mockRecipeId}/ratings`,
            {
                method: 'POST',
                body: JSON.stringify(mockRatingData),
            },
            expect.any(Object),
            mockApiBaseUrl,
        );
    });

    it('should return rating response data', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockResponseData);

        const { result } = renderHook(() => useRateRecipe(), {
            wrapper: createWrapper(),
        });

        const data = await result.current.mutateAsync({ recipeId: mockRecipeId, data: mockRatingData });

        expect(data).toEqual(mockResponseData);
    });

    it('should invalidate recipe and recipes queries on success', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockResponseData);

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                <ApiConfigProvider apiBaseUrl={mockApiBaseUrl}>{children}</ApiConfigProvider>
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useRateRecipe(), {
            wrapper,
        });

        await result.current.mutateAsync({ recipeId: mockRecipeId, data: mockRatingData });

        await waitFor(() => {
            expect(invalidateQueriesSpy).toHaveBeenCalledWith({
                queryKey: [ApiQueryKey.RECIPE, mockRecipeId],
            });
            expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [ApiQueryKey.RECIPES] });
        });
    });

    it('should handle API errors', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);
        const error = new Error('API Error');

        mockFetchApi.mockRejectedValue(error);

        const { result } = renderHook(() => useRateRecipe(), {
            wrapper: createWrapper(),
        });

        await expect(result.current.mutateAsync({ recipeId: mockRecipeId, data: mockRatingData })).rejects.toThrow(
            'API Error',
        );
    });
});
