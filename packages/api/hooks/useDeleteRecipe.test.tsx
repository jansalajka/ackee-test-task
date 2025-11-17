import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as fetchModule from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { ApiConfigProvider } from '../context/ApiConfigContext';
import { useDeleteRecipe } from './useDeleteRecipe';

vi.mock('../client/fetch');

describe('useDeleteRecipe', () => {
    const mockApiBaseUrl = 'https://api.example.com';
    const mockRecipeId = 'recipe-123';

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

    it('should delete recipe with correct endpoint', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(undefined);

        const { result } = renderHook(() => useDeleteRecipe(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync(mockRecipeId);

        expect(mockFetchApi).toHaveBeenCalledWith(
            `/recipes/${mockRecipeId}`,
            { method: 'DELETE' },
            undefined,
            mockApiBaseUrl,
        );
    });

    it('should remove recipe query and invalidate recipes query on success', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(undefined);

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        const removeQueriesSpy = vi.spyOn(queryClient, 'removeQueries');
        const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                <ApiConfigProvider apiBaseUrl={mockApiBaseUrl}>{children}</ApiConfigProvider>
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useDeleteRecipe(), {
            wrapper,
        });

        await result.current.mutateAsync(mockRecipeId);

        await waitFor(() => {
            expect(removeQueriesSpy).toHaveBeenCalledWith({ queryKey: [ApiQueryKey.RECIPE, mockRecipeId] });
            expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [ApiQueryKey.RECIPES] });
        });
    });

    it('should handle API errors', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);
        const error = new Error('API Error');

        mockFetchApi.mockRejectedValue(error);

        const { result } = renderHook(() => useDeleteRecipe(), {
            wrapper: createWrapper(),
        });

        await expect(result.current.mutateAsync(mockRecipeId)).rejects.toThrow('API Error');
    });
});
