import type { FieldErrors } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import type { useIntl } from '@workspace/localization';

import { translateErrorsOfDef, translateObjectErrors, translateRecordErrors } from './translateErrors';

type TranslateUtils = {
    formatMessage: ReturnType<typeof useIntl>['formatMessage'];
};

describe('translateErrors', () => {
    const mockFormatMessage = (id: string) => `translated:${id}`;

    const createTranslateUtils = (): TranslateUtils => ({
        formatMessage: mockFormatMessage as ReturnType<typeof useIntl>['formatMessage'],
    });

    describe('translateObjectErrors', () => {
        it('should translate error messages in object schema', () => {
            const schema = z.object({
                name: z.string({ required_error: 'form.error.required' as any }),
                email: z.string({ required_error: 'form.error.required' as any }),
            });

            const def = schema._def;
            const errors: FieldErrors = {
                name: {
                    message: 'form.error.required',
                    type: 'required',
                },
                email: {
                    message: 'form.error.required',
                    type: 'required',
                },
            };

            const result = translateObjectErrors(def, errors, createTranslateUtils());

            expect(result.name?.message).toBe('translated:form.error.required');
            expect(result.email?.message).toBe('translated:form.error.required');
        });

        it('should handle nested object errors', () => {
            const schema = z.object({
                user: z.object({
                    name: z.string({ required_error: 'form.error.required' as any }),
                }),
            });

            const def = schema._def;
            const errors: FieldErrors = {
                user: {
                    name: {
                        message: 'form.error.required',
                        type: 'required',
                    },
                },
            };

            const result = translateObjectErrors(def, errors, createTranslateUtils());

            expect(result.user).toBeDefined();
            if (result.user && typeof result.user === 'object' && 'name' in result.user) {
                const nameError = result.user.name as { message?: string };

                expect(nameError.message).toBe('translated:form.error.required');
            }
        });

        it('should handle array errors in object', () => {
            const schema = z.object({
                tags: z.array(z.string({ required_error: 'form.error.required' as any })),
            });

            const def = schema._def;
            const errors: FieldErrors = {
                tags: {
                    '0': {
                        message: 'form.error.required',
                        type: 'required',
                    },
                },
            };

            const result = translateObjectErrors(def, errors, createTranslateUtils());

            expect(result.tags).toBeDefined();
            if (result.tags && typeof result.tags === 'object' && '0' in result.tags) {
                const tagError = result.tags['0'] as { message?: string };

                expect(tagError.message).toBe('translated:form.error.required');
            }
        });

        it('should not translate non-message-key errors', () => {
            const schema = z.object({
                name: z.string(),
            });

            const def = schema._def;
            const errors: FieldErrors = {
                name: {
                    message: 'Custom error message',
                    type: 'custom',
                },
            };

            const result = translateObjectErrors(def, errors, createTranslateUtils());

            expect(result.name?.message).toBe('Custom error message');
        });

        it('should handle empty errors object', () => {
            const schema = z.object({
                name: z.string(),
            });

            const def = schema._def;
            const errors: FieldErrors = {};

            const result = translateObjectErrors(def, errors, createTranslateUtils());

            expect(result).toEqual({});
        });

        it('should handle errors for fields not in schema', () => {
            const schema = z.object({
                name: z.string(),
            });

            const def = schema._def;
            const errors: FieldErrors = {
                unknownField: {
                    message: 'form.error.required',
                    type: 'required',
                },
            };

            const result = translateObjectErrors(def, errors, createTranslateUtils());

            expect(result.unknownField?.message).toBe('translated:form.error.required');
        });
    });

    describe('translateRecordErrors', () => {
        it('should translate error messages in record schema', () => {
            const schema = z.record(z.string(), z.string({ required_error: 'form.error.required' as any }));
            const def = schema._def;
            const errors: FieldErrors = {
                key1: {
                    message: 'form.error.required',
                    type: 'required',
                },
                key2: {
                    message: 'form.error.required',
                    type: 'required',
                },
            };

            const result = translateRecordErrors(def, errors, createTranslateUtils());

            expect(result.key1?.message).toBe('translated:form.error.required');
            expect(result.key2?.message).toBe('translated:form.error.required');
        });

        it('should only translate errors for valid record keys', () => {
            const schema = z.record(z.string().min(3), z.string({ required_error: 'form.error.required' as any }));
            const def = schema._def;
            const errors: FieldErrors = {
                validKey: {
                    message: 'form.error.required',
                    type: 'required',
                },
                ab: {
                    message: 'form.error.required',
                    type: 'required',
                },
            };

            const result = translateRecordErrors(def, errors, createTranslateUtils());

            expect(result.validKey?.message).toBe('translated:form.error.required');
            expect(result.ab?.message).toBe('translated:form.error.required');
        });

        it('should handle empty errors object', () => {
            const schema = z.record(z.string(), z.string());
            const def = schema._def;
            const errors: FieldErrors = {};

            const result = translateRecordErrors(def, errors, createTranslateUtils());

            expect(result).toEqual({});
        });
    });

    describe('translateErrorsOfDef', () => {
        it('should translate object errors', () => {
            const schema = z.object({
                name: z.string({ required_error: 'form.error.required' as any }),
            });

            const def = schema._def;
            const errors: FieldErrors = {
                name: {
                    message: 'form.error.required',
                    type: 'required',
                },
            };

            const result = translateErrorsOfDef(def, errors, createTranslateUtils());

            expect(result.name?.message).toBe('translated:form.error.required');
        });

        it('should translate record errors', () => {
            const schema = z.record(z.string(), z.string({ required_error: 'form.error.required' as any }));
            const def = schema._def;
            const errors: FieldErrors = {
                key1: {
                    message: 'form.error.required',
                    type: 'required',
                },
            };

            const result = translateErrorsOfDef(def, errors, createTranslateUtils());

            expect(result.key1?.message).toBe('translated:form.error.required');
        });

        it('should throw error for invalid def type', () => {
            const schema = z.string();
            const def = schema._def;
            const errors: FieldErrors = {};

            expect(() => translateErrorsOfDef(def, errors, createTranslateUtils())).toThrow('invalid def received');
        });
    });
});
