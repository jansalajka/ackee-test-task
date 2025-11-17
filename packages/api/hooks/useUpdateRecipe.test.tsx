import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as fetchModule from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { ApiConfigProvider } from '../context/ApiConfigContext';
import { useUpdateRecipe } from './useUpdateRecipe';

vi.mock('../client/fetch');

describe('useUpdateRecipe', () => {
    const mockApiBaseUrl = 'https://api.example.com';
    const mockRecipeId = 'recipe-123';
    const mockUpdateData = {
        name: 'Updated Recipe',
        description: 'Updated Description',
    };

    const mockResponseData = {
        id: mockRecipeId,
        name: 'Updated Recipe',
        description: 'Updated Description',
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

    it('should update recipe with correct data', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockResponseData);

        const { result } = renderHook(() => useUpdateRecipe(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync({ recipeId: mockRecipeId, data: mockUpdateData });

        expect(mockFetchApi).toHaveBeenCalledWith(
            `/recipes/${mockRecipeId}`,
            {
                method: 'PUT',
                body: JSON.stringify(mockUpdateData),
            },
            expect.any(Object),
            mockApiBaseUrl,
        );
    });

    it('should return updated recipe data', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockResponseData);

        const { result } = renderHook(() => useUpdateRecipe(), {
            wrapper: createWrapper(),
        });

        const data = await result.current.mutateAsync({ recipeId: mockRecipeId, data: mockUpdateData });

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

        const { result } = renderHook(() => useUpdateRecipe(), {
            wrapper,
        });

        await result.current.mutateAsync({ recipeId: mockRecipeId, data: mockUpdateData });

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

        const { result } = renderHook(() => useUpdateRecipe(), {
            wrapper: createWrapper(),
        });

        await expect(result.current.mutateAsync({ recipeId: mockRecipeId, data: mockUpdateData })).rejects.toThrow(
            'API Error',
        );
    });
});
