import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { ApiError, fetchApi } from './fetch';

const TEST_API_BASE_URL = 'https://cookbook.ack.ee/api/v1';

const mockFetch = vi.fn();

global.fetch = mockFetch;

describe('fetchApi', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('successful requests', () => {
        it('should return validated data when schema is provided', async () => {
            const schema = z.object({
                id: z.string(),
                name: z.string(),
            });

            const mockData = { id: '123', name: 'Test Recipe' };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockData,
            });

            const result = await fetchApi('/recipes', { method: 'GET' }, schema, TEST_API_BASE_URL);

            expect(result).toEqual(mockData);
            expect(mockFetch).toHaveBeenCalledWith(
                'https://cookbook.ack.ee/api/v1/recipes',
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                    }),
                }),
            );
        });

        it('should return void for 204 No Content responses', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 204,
            });

            const result = await fetchApi('/recipes/123', { method: 'DELETE' }, undefined, TEST_API_BASE_URL);

            expect(result).toBeUndefined();
        });

        it('should include custom headers', async () => {
            const schema = z.object({ id: z.string() });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => ({ id: '123' }),
            });

            await fetchApi(
                '/recipes',
                {
                    method: 'GET',
                    headers: {
                        'X-Custom-Header': 'value',
                    },
                },
                schema,
                TEST_API_BASE_URL,
            );

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'X-Custom-Header': 'value',
                    }),
                }),
            );
        });
    });

    describe('error handling', () => {
        it('should throw ApiError with status and JSON error data', async () => {
            const errorData = { message: 'Not found' };

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                json: async () => errorData,
            });

            try {
                await fetchApi('/recipes/999', { method: 'GET' }, undefined, TEST_API_BASE_URL);
                expect.fail('Should have thrown ApiError');
            } catch (error) {
                expect(error).toBeInstanceOf(ApiError);
                expect((error as ApiError).status).toBe(404);
                expect((error as ApiError).response).toEqual(errorData);
            }
        });

        it('should throw ApiError with text error data when JSON parsing fails', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: async () => {
                    throw new Error('Invalid JSON');
                },
                text: async () => 'Server error',
            });

            try {
                await fetchApi('/recipes', { method: 'GET' }, undefined, TEST_API_BASE_URL);
                expect.fail('Should have thrown ApiError');
            } catch (error) {
                expect(error).toBeInstanceOf(ApiError);
                expect((error as ApiError).status).toBe(500);
                expect((error as ApiError).response).toBe('Server error');
            }
        });

        it('should throw validation error when data does not match schema', async () => {
            const schema = z.object({
                id: z.string(),
                name: z.string(),
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => ({ id: '123' }), // missing 'name'
            });

            await expect(fetchApi('/recipes', { method: 'GET' }, schema, TEST_API_BASE_URL)).rejects.toThrow();
        });
    });

    describe('ApiError', () => {
        it('should create ApiError with correct properties', () => {
            const error = new ApiError('Test error', 404, { message: 'Not found' });

            expect(error).toBeInstanceOf(Error);
            expect(error.name).toBe('ApiError');
            expect(error.message).toBe('Test error');
            expect(error.status).toBe(404);
            expect(error.response).toEqual({ message: 'Not found' });
        });
    });
});
