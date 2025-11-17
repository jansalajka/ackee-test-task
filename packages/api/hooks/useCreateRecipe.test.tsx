import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as fetchModule from '../client/fetch';
import { ApiQueryKey } from '../constants';
import { ApiConfigProvider } from '../context/ApiConfigContext';
import { useCreateRecipe } from './useCreateRecipe';

vi.mock('../client/fetch');

describe('useCreateRecipe', () => {
    const mockApiBaseUrl = 'https://api.example.com';
    const mockCreateData = {
        name: 'New Recipe',
        description: 'Recipe Description',
        ingredients: ['ingredient1', 'ingredient2'],
        duration: 30,
        info: 'Recipe Info',
    };

    const mockResponseData = {
        id: 'recipe-123',
        name: 'New Recipe',
        description: 'Recipe Description',
        ingredients: ['ingredient1', 'ingredient2'],
        duration: 30,
        info: 'Recipe Info',
        score: 0,
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

    it('should create recipe with correct data', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockResponseData);

        const { result } = renderHook(() => useCreateRecipe(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync(mockCreateData);

        expect(mockFetchApi).toHaveBeenCalledWith(
            '/recipes',
            {
                method: 'POST',
                body: JSON.stringify(mockCreateData),
            },
            expect.any(Object),
            mockApiBaseUrl,
        );
    });

    it('should return created recipe data', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);

        mockFetchApi.mockResolvedValue(mockResponseData);

        const { result } = renderHook(() => useCreateRecipe(), {
            wrapper: createWrapper(),
        });

        const data = await result.current.mutateAsync(mockCreateData);

        expect(data).toEqual(mockResponseData);
    });

    it('should invalidate recipes query on success', async () => {
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

        const { result } = renderHook(() => useCreateRecipe(), {
            wrapper,
        });

        await result.current.mutateAsync(mockCreateData);

        await waitFor(() => {
            expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [ApiQueryKey.RECIPES] });
        });
    });

    it('should handle API errors', async () => {
        const mockFetchApi = vi.mocked(fetchModule.fetchApi);
        const error = new Error('API Error');

        mockFetchApi.mockRejectedValue(error);

        const { result } = renderHook(() => useCreateRecipe(), {
            wrapper: createWrapper(),
        });

        await expect(result.current.mutateAsync(mockCreateData)).rejects.toThrow('API Error');
    });
});
