import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import * as fetchModule from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { ApiConfigProvider } from '../context/ApiConfigContext';
import { useRecipe } from './useRecipe';

vi.mock('../client/fetch');

describe('useRecipe', () => {
    const mockApiBaseUrl = 'https://api.example.com';
    const mockRecipeId = 'recipe-123';
    const mockRecipeData = {
        id: mockRecipeId,
        name: 'Test Recipe',
        description: 'Test Description',
        ingredients: ['ingredient1', 'ingredient2'],
        duration: 30,
        info: 'Test Info',
        score: 85,
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

    it('should fetch recipe when recipeId is provided', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockRecipeData);

        const { result } = renderHook(() => useRecipe(mockRecipeId), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockFetchApi).toHaveBeenCalledWith(
            `/recipes/${mockRecipeId}`,
            { method: 'GET' },
            expect.any(Object),
            mockApiBaseUrl,
        );
        expect(result.current.data).toEqual(mockRecipeData);
    });

    it('should not fetch when recipeId is undefined', () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        const { result } = renderHook(() => useRecipe(undefined), {
            wrapper: createWrapper(),
        });

        expect(result.current.isEnabled).toBe(false);
        expect(mockFetchApi).not.toHaveBeenCalled();
    });

    it('should not fetch when recipeId is empty string', () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        const { result } = renderHook(() => useRecipe(''), {
            wrapper: createWrapper(),
        });

        expect(result.current.isEnabled).toBe(false);
        expect(mockFetchApi).not.toHaveBeenCalled();
    });

    it('should include recipeId and apiBaseUrl in query key', () => {
        const { result } = renderHook(() => useRecipe(mockRecipeId), {
            wrapper: createWrapper(),
        });

        expect(result.current.queryKey).toEqual([ApiQueryKey.RECIPE, mockRecipeId, mockApiBaseUrl]);
    });

    it('should throw error when recipeId is missing in queryFn', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockRejectedValue(new Error('Recipe ID is required'));

        const { result } = renderHook(() => useRecipe(undefined), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(false);
        });

        expect(mockFetchApi).not.toHaveBeenCalled();
    });

    it('should use different query key for different apiBaseUrl', () => {
        const apiBaseUrl1 = 'https://api1.example.com';
        const apiBaseUrl2 = 'https://api2.example.com';

        const { result: result1 } = renderHook(() => useRecipe(mockRecipeId), {
            wrapper: createWrapper(apiBaseUrl1),
        });

        const { result: result2 } = renderHook(() => useRecipe(mockRecipeId), {
            wrapper: createWrapper(apiBaseUrl2),
        });

        expect(result1.current.queryKey).toEqual([ApiQueryKey.RECIPE, mockRecipeId, apiBaseUrl1]);
        expect(result2.current.queryKey).toEqual([ApiQueryKey.RECIPE, mockRecipeId, apiBaseUrl2]);
    });
});
