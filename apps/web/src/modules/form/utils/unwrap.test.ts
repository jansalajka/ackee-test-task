import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { unwrapPossibleZodEffects, unwrapPossibleZodEffectsDef } from './unwrap';

describe('unwrap', () => {
    describe('unwrapPossibleZodEffects', () => {
        it('should return schema as-is when no effects', () => {
            const schema = z.string();
            const result = unwrapPossibleZodEffects(schema);

            expect(result).toBe(schema);
        });

        it('should unwrap single effect', () => {
            const baseSchema = z.string();
            const effectsSchema = baseSchema.refine(val => val.length > 0);
            const result = unwrapPossibleZodEffects(effectsSchema);

            expect(result).toBe(baseSchema);
        });

        it('should unwrap nested effects', () => {
            const baseSchema = z.string();
            const effectsSchema1 = baseSchema.refine(val => val.length > 0);
            const effectsSchema2 = effectsSchema1.refine(val => val.length < 100);
            const result = unwrapPossibleZodEffects(effectsSchema2);

            expect(result).toBe(baseSchema);
        });

        it('should handle object schema with effects', () => {
            const baseSchema = z.object({ name: z.string() });
            const effectsSchema = baseSchema.refine(obj => obj.name.length > 0);
            const result = unwrapPossibleZodEffects(effectsSchema);

            expect(result).toBe(baseSchema);
        });

        it('should handle array schema with effects', () => {
            const baseSchema = z.array(z.string());
            const effectsSchema = baseSchema.refine(arr => arr.length > 0);
            const result = unwrapPossibleZodEffects(effectsSchema);

            expect(result).toBe(baseSchema);
        });
    });

    describe('unwrapPossibleZodEffectsDef', () => {
        it('should return def as-is when no effects', () => {
            const schema = z.string();
            const def = schema._def;
            const result = unwrapPossibleZodEffectsDef(def);

            expect(result).toBe(def);
        });

        it('should unwrap single effect def', () => {
            const baseSchema = z.string();
            const effectsSchema = baseSchema.refine(val => val.length > 0);
            const def = effectsSchema._def;
            const result = unwrapPossibleZodEffectsDef(def);

            expect(result).toBe(baseSchema._def);
        });

        it('should unwrap nested effects def', () => {
            const baseSchema = z.string();
            const effectsSchema1 = baseSchema.refine(val => val.length > 0);
            const effectsSchema2 = effectsSchema1.refine(val => val.length < 100);
            const def = effectsSchema2._def;
            const result = unwrapPossibleZodEffectsDef(def);

            expect(result).toBe(baseSchema._def);
        });

        it('should handle object schema def with effects', () => {
            const baseSchema = z.object({ name: z.string() });
            const effectsSchema = baseSchema.refine(obj => obj.name.length > 0);
            const def = effectsSchema._def;
            const result = unwrapPossibleZodEffectsDef(def);

            expect(result).toBe(baseSchema._def);
        });
    });
});
