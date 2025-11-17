import React from 'react';
import { renderHook } from '@testing-library/react';
import type { FieldErrors } from 'react-hook-form';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { useTranslateErrors } from './useTranslateErrors';

const createWrapper = (locale: string = 'en', messages: Record<string, string> = {}) => {
    return ({ children }: { children: React.ReactNode }) => (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
};

describe('useTranslateErrors', () => {
    it('should return translation function for object schema', () => {
        const schema = z.object({
            name: z.string({ required_error: 'form.error.required' as any }),
        });

        const { result } = renderHook(() => useTranslateErrors(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        expect(typeof result.current).toBe('function');
    });

    it('should translate errors for object schema', () => {
        const schema = z.object({
            name: z.string({ required_error: 'form.error.required' as any }),
        });

        const { result } = renderHook(() => useTranslateErrors(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const errors: FieldErrors = {
            name: {
                message: 'form.error.required',
                type: 'required',
            },
        };

        const translated = result.current(errors);

        expect(translated.name?.message).toBe('This field is required');
    });

    it('should translate errors for union schema', () => {
        const schema = z.union([
            z.object({
                type: z.literal('email'),
                value: z.string({ required_error: 'form.error.required' as any }),
            }),
            z.object({
                type: z.literal('phone'),
                value: z.string({ required_error: 'form.error.required' as any }),
            }),
        ]);

        const { result } = renderHook(() => useTranslateErrors(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const errors: FieldErrors = {
            value: {
                message: 'form.error.required',
                type: 'required',
            },
        };

        const translated = result.current(errors);

        expect(translated.value?.message).toBe('This field is required');
    });

    it('should translate errors for record schema', () => {
        const schema = z.record(z.string(), z.string({ required_error: 'form.error.required' as any }));

        const { result } = renderHook(() => useTranslateErrors(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const errors: FieldErrors = {
            key1: {
                message: 'form.error.required',
                type: 'required',
            },
        };

        const translated = result.current(errors);

        expect(translated.key1?.message).toBe('This field is required');
    });

    it('should handle schema with effects', () => {
        const schema = z
            .object({
                name: z.string({ required_error: 'form.error.required' as any }),
            })
            .refine(obj => obj.name.length > 0);

        const { result } = renderHook(() => useTranslateErrors(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const errors: FieldErrors = {
            name: {
                message: 'form.error.required',
                type: 'required',
            },
        };

        const translated = result.current(errors);

        expect(translated.name?.message).toBe('This field is required');
    });

    it('should memoize translation function', () => {
        const schema = z.object({
            name: z.string({ required_error: 'form.error.required' as any }),
        });

        const { result, rerender } = renderHook(() => useTranslateErrors(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const firstFunction = result.current;

        rerender();

        expect(result.current).toBe(firstFunction);
    });

    it('should update translation function when schema changes', () => {
        const schema1 = z.object({
            name: z.string({ required_error: 'form.error.required' as any }),
        });

        const schema2 = z.object({
            email: z.string({ required_error: 'form.error.required' as any }),
        });

        const { result, rerender } = renderHook(
            ({ schema }: { schema: typeof schema1 }) => useTranslateErrors(schema),
            {
                initialProps: { schema: schema1 },
                wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
            },
        );

        const firstFunction = result.current;

        rerender({ schema: schema2 });

        expect(result.current).not.toBe(firstFunction);
    });

    it('should handle empty errors', () => {
        const schema = z.object({
            name: z.string({ required_error: 'form.error.required' as any }),
        });

        const { result } = renderHook(() => useTranslateErrors(schema), {
            wrapper: createWrapper('en', { 'form.error.required': 'This field is required' }),
        });

        const errors: FieldErrors = {};

        const translated = result.current(errors);

        expect(translated).toEqual({});
    });
});
