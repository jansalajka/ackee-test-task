import type { ZodTypeAny, ZodTypeDef } from 'zod';

import type { NestedPossibleZodEffect } from '../types';
import { isZodEffects, isZodEffectsDef } from './guards';

/**
 * Recursively unwraps Zod effects (refine, transform) to get the inner schema
 *
 * @param schema - Zod schema that may contain nested effects
 * @returns The unwrapped inner schema without effects
 */
export function unwrapPossibleZodEffects<T extends ZodTypeAny>(schema: NestedPossibleZodEffect<T>): T {
    return isZodEffects(schema) ? unwrapPossibleZodEffects(schema.innerType()) : schema;
}

/**
 * Recursively unwraps Zod effects definition to get the inner definition
 *
 * @param def - Zod type definition that may contain nested effects
 * @returns The unwrapped inner type definition without effects
 */
export function unwrapPossibleZodEffectsDef(def: ZodTypeDef): ZodTypeDef {
    return isZodEffectsDef(def) ? unwrapPossibleZodEffectsDef(def.schema._def) : def;
}
