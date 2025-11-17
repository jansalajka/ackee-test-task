import { describe, expect, it } from 'vitest';
import { z, ZodFirstPartyTypeKind } from 'zod';

import { isArrayDef, isDefType, isObjectDef, isRecordDef, isUnionDef, isZodEffects, isZodEffectsDef } from './guards';

describe('guards', () => {
    describe('isDefType', () => {
        it('should return true for matching type', () => {
            const stringSchema = z.string();
            const def = stringSchema._def;

            expect(isDefType(def, ZodFirstPartyTypeKind.ZodString)).toBe(true);
        });

        it('should return false for non-matching type', () => {
            const stringSchema = z.string();
            const def = stringSchema._def;

            expect(isDefType(def, ZodFirstPartyTypeKind.ZodNumber)).toBe(false);
        });
    });

    describe('isArrayDef', () => {
        it('should return true for array definition', () => {
            const arraySchema = z.array(z.string());
            const def = arraySchema._def;

            expect(isArrayDef(def)).toBe(true);
        });

        it('should return false for non-array definition', () => {
            const stringSchema = z.string();
            const def = stringSchema._def;

            expect(isArrayDef(def)).toBe(false);
        });
    });

    describe('isObjectDef', () => {
        it('should return true for object definition', () => {
            const objectSchema = z.object({ name: z.string() });
            const def = objectSchema._def;

            expect(isObjectDef(def)).toBe(true);
        });

        it('should return false for non-object definition', () => {
            const stringSchema = z.string();
            const def = stringSchema._def;

            expect(isObjectDef(def)).toBe(false);
        });
    });

    describe('isRecordDef', () => {
        it('should return true for record definition', () => {
            const recordSchema = z.record(z.string(), z.number());
            const def = recordSchema._def;

            expect(isRecordDef(def)).toBe(true);
        });

        it('should return false for non-record definition', () => {
            const stringSchema = z.string();
            const def = stringSchema._def;

            expect(isRecordDef(def)).toBe(false);
        });
    });

    describe('isUnionDef', () => {
        it('should return true for union definition', () => {
            const unionSchema = z.union([z.string(), z.number()]);
            const def = unionSchema._def;

            expect(isUnionDef(def)).toBe(true);
        });

        it('should return false for non-union definition', () => {
            const stringSchema = z.string();
            const def = stringSchema._def;

            expect(isUnionDef(def)).toBe(false);
        });
    });

    describe('isZodEffects', () => {
        it('should return true for ZodEffects schema', () => {
            const effectsSchema = z.string().refine(val => val.length > 0);

            expect(isZodEffects(effectsSchema)).toBe(true);
        });

        it('should return false for non-effects schema', () => {
            const stringSchema = z.string();

            expect(isZodEffects(stringSchema)).toBe(false);
        });

        it('should return false for plain object', () => {
            const plainObject = {};

            expect(isZodEffects(plainObject)).toBe(false);
        });
    });

    describe('isZodEffectsDef', () => {
        it('should return true for ZodEffects definition', () => {
            const effectsSchema = z.string().refine(val => val.length > 0);
            const def = effectsSchema._def;

            expect(isZodEffectsDef(def)).toBe(true);
        });

        it('should return false for non-effects definition', () => {
            const stringSchema = z.string();
            const def = stringSchema._def;

            expect(isZodEffectsDef(def)).toBe(false);
        });
    });
});
