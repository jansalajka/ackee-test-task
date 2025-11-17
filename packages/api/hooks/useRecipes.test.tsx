import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import * as fetchModule from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { ApiConfigProvider } from '../context/ApiConfigContext';
import { useRecipes } from './useRecipes';

vi.mock('../client/fetch');

describe('useRecipes', () => {
    const mockApiBaseUrl = 'https://api.example.com';
    const mockRecipesData = [
        {
            id: 'recipe-1',
            name: 'Recipe 1',
            duration: 30,
            score: 85,
        },
        {
            id: 'recipe-2',
            name: 'Recipe 2',
            duration: 45,
            score: 90,
        },
    ];

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

    it('should fetch recipes without params', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockRecipesData);

        const { result } = renderHook(() => useRecipes(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockFetchApi).toHaveBeenCalledWith('/recipes', { method: 'GET' }, expect.any(Object), mockApiBaseUrl);
        expect(result.current.data).toEqual(mockRecipesData);
    });

    it('should fetch recipes with limit param', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockRecipesData);

        const { result } = renderHook(() => useRecipes({ limit: 10 }), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockFetchApi).toHaveBeenCalledWith(
            '/recipes?limit=10',
            { method: 'GET' },
            expect.any(Object),
            mockApiBaseUrl,
        );
    });

    it('should fetch recipes with offset param', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockRecipesData);

        const { result } = renderHook(() => useRecipes({ offset: 20 }), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockFetchApi).toHaveBeenCalledWith(
            '/recipes?offset=20',
            { method: 'GET' },
            expect.any(Object),
            mockApiBaseUrl,
        );
    });

    it('should fetch recipes with both limit and offset params', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockRecipesData);

        const { result } = renderHook(() => useRecipes({ limit: 10, offset: 20 }), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockFetchApi).toHaveBeenCalledWith(
            '/recipes?limit=10&offset=20',
            { method: 'GET' },
            expect.any(Object),
            mockApiBaseUrl,
        );
    });

    it('should include params and apiBaseUrl in query key', () => {
        const params = { limit: 10, offset: 20 };

        const { result } = renderHook(() => useRecipes(params), {
            wrapper: createWrapper(),
        });

        expect(result.current.queryKey).toEqual([ApiQueryKey.RECIPES, params, mockApiBaseUrl]);
    });

    it('should use different query key for different params', () => {
        const params1 = { limit: 10 };
        const params2 = { limit: 20 };

        const { result: result1 } = renderHook(() => useRecipes(params1), {
            wrapper: createWrapper(),
        });

        const { result: result2 } = renderHook(() => useRecipes(params2), {
            wrapper: createWrapper(),
        });

        expect(result1.current.queryKey).toEqual([ApiQueryKey.RECIPES, params1, mockApiBaseUrl]);
        expect(result2.current.queryKey).toEqual([ApiQueryKey.RECIPES, params2, mockApiBaseUrl]);
    });

    it('should use different query key for different apiBaseUrl', () => {
        const apiBaseUrl1 = 'https://api1.example.com';
        const apiBaseUrl2 = 'https://api2.example.com';

        const { result: result1 } = renderHook(() => useRecipes(), {
            wrapper: createWrapper(apiBaseUrl1),
        });

        const { result: result2 } = renderHook(() => useRecipes(), {
            wrapper: createWrapper(apiBaseUrl2),
        });

        expect(result1.current.queryKey).toEqual([ApiQueryKey.RECIPES, undefined, apiBaseUrl1]);
        expect(result2.current.queryKey).toEqual([ApiQueryKey.RECIPES, undefined, apiBaseUrl2]);
    });
});
