import type { z } from 'zod';

/**
 * Default API base URL (fake API for development)
 */
const DEFAULT_API_BASE_URL = 'https://my-json-server.typicode.com/AckeeCZ/web-task-cookbook-fake-api';

/**
 * Custom error class for API errors
 * Extends the base Error class with HTTP status and response data
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Fetch wrapper with Zod validation
 * Overload for requests with schema validation
 *
 * @param endpoint - API endpoint path (e.g., '/recipes')
 * @param options - Fetch request options (method, body, headers, etc.)
 * @param schema - Zod schema to validate the response
 * @param apiBaseUrl - Optional API base URL (uses default if not provided)
 * @returns Promise resolving to the validated response data
 */
export async function fetchApi<T extends z.ZodType>(
    endpoint: string,
    options: RequestInit,
    schema: T,
    apiBaseUrl?: string,
): Promise<z.infer<T>>;

/**
 * Fetch wrapper without schema validation (for DELETE, etc.)
 *
 * @param endpoint - API endpoint path (e.g., '/recipes/123')
 * @param options - Optional fetch request options (method, headers, etc.)
 * @param schema - Must be undefined or never for this overload
 * @param apiBaseUrl - Optional API base URL (uses default if not provided)
 * @returns Promise resolving to void
 */
export async function fetchApi(
    endpoint: string,
    options?: RequestInit,
    schema?: never,
    apiBaseUrl?: string,
): Promise<void>;

/**
 * Fetch wrapper with optional Zod validation
 *
 * @param endpoint - API endpoint path (e.g., '/recipes' or '/recipes/123')
 * @param options - Optional fetch request options (method, body, headers, etc.)
 * @param schema - Optional Zod schema to validate the response
 * @param apiBaseUrl - Optional API base URL (uses default if not provided)
 * @returns Promise resolving to validated response data or void
 * @throws {ApiError} When the API request fails
 */
export async function fetchApi<T extends z.ZodType>(
    endpoint: string,
    options?: RequestInit,
    schema?: T,
    apiBaseUrl?: string,
): Promise<z.infer<T> | void> {
    const baseUrl = apiBaseUrl || DEFAULT_API_BASE_URL;
    const url = `${baseUrl}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let errorData: unknown;
        let errorMessage = response.statusText || `HTTP ${response.status}`;

        try {
            errorData = await response.json();
            if (errorData && typeof errorData === 'object') {
                const data = errorData as Record<string, unknown>;
                const message = data.message || data.error;

                if (typeof message === 'string') {
                    errorMessage = message;
                }
            }
        } catch {
            try {
                errorData = await response.text();
                if (typeof errorData === 'string') {
                    errorMessage = errorData;
                }
            } catch {}
        }

        throw new ApiError(
            errorMessage || `API request failed with status ${response.status}`,
            response.status,
            errorData,
        );
    }

    if (response.status === 204) {
        return;
    }

    const data = await response.json();

    if (schema) {
        return schema.parse(data);
    }

    return data as z.infer<T>;
}
