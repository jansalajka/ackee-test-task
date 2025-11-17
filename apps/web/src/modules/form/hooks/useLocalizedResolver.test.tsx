import React from 'react';
import { renderHook } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { useLocalizedResolver } from './useLocalizedResolver';

const requiredErrorMessage = 'form.error.required' as any;
const requiredString = () => z.string(
    { required_error: requiredErrorMessage }).min(1, { message: requiredErrorMessage }
);

const createWrapper = (locale: string = 'en', messages: Record<string, string> = {}) => {
    return ({ children }: { children: React.ReactNode }) => (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
};

describe('useLocalizedResolver', () => {
    it('should return a resolver function', () => {
        const schema = z.object({
            name: requiredString(),
        });

        const { result } = renderHook(() => useLocalizedResolver(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        expect(typeof result.current).toBe('function');
    });

    it('should validate valid data', async () => {
        const schema = z.object({
            name: requiredString(),
        });

        const { result } = renderHook(() => useLocalizedResolver(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const resolver = result.current;
        const result_validation = await resolver({ name: 'John' }, undefined, {});

        expect(result_validation.values).toEqual({ name: 'John' });
        expect(result_validation.errors).toEqual({});
    });

    it('should return translated errors for invalid data', async () => {
        const schema = z.object({
            name: requiredString(),
        });

        const { result } = renderHook(() => useLocalizedResolver(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const resolver = result.current;
        const result_validation = await resolver({ name: '' }, undefined, {});

        expect(result_validation.errors.name).toBeDefined();
        if (result_validation.errors.name && typeof result_validation.errors.name === 'object') {
            const error = result_validation.errors.name as { message?: string };

            expect(error.message).toBe('This field is required');
        }
    });

    it('should handle nested object errors', async () => {
        const schema = z.object({
            user: z.object({
                name: requiredString(),
            }),
        });

        const { result } = renderHook(() => useLocalizedResolver(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const resolver = result.current;
        const result_validation = await resolver({ user: { name: '' } }, undefined, {});

        expect(result_validation.errors.user).toBeDefined();
        if (result_validation.errors.user && typeof result_validation.errors.user === 'object') {
            const userError = result_validation.errors.user as { name?: { message?: string } };

            expect(userError.name?.message).toBe('This field is required');
        }
    });

    it('should handle schema with effects', async () => {
        const schema = z
            .object({
                name: requiredString(),
            })
            .refine(obj => obj.name.length > 0);

        const { result } = renderHook(() => useLocalizedResolver(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const resolver = result.current;
        const result_validation = await resolver({ name: '' }, undefined, {});

        expect(result_validation.errors.name).toBeDefined();
    });

    it('should memoize resolver function', () => {
        const schema = z.object({
            name: requiredString(),
        });

        const { result, rerender } = renderHook(() => useLocalizedResolver(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const firstResolver = result.current;

        rerender();

        expect(result.current).toBe(firstResolver);
    });

    it('should update resolver when schema changes', () => {
        const schema1 = z.object({
            name: requiredString(),
        });

        const schema2 = z.object({
            email: requiredString(),
        });

        const { result, rerender } = renderHook(
            ({ schema }: { schema: typeof schema1 }) => useLocalizedResolver(schema),
            {
                initialProps: { schema: schema1 },
                wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
            },
        );

        const firstResolver = result.current;

        rerender({ schema: schema2 });

        expect(result.current).not.toBe(firstResolver);
    });

    it('should handle union schema', async () => {
        const schema = z.union([
            z.object({
                type: z.literal('email'),
                value: requiredString(),
            }),
            z.object({
                type: z.literal('phone'),
                value: requiredString(),
            }),
        ]);

        const { result } = renderHook(() => useLocalizedResolver(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const resolver = result.current;
        const result_validation = await resolver({ type: 'email', value: '' }, undefined, {});

        expect(result_validation.errors.value).toBeDefined();
    });
});
