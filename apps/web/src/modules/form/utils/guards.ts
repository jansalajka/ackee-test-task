import {
    ZodEffects,
    ZodFirstPartyTypeKind,
    type ZodArrayDef,
    type ZodEffectsDef,
    type ZodObjectDef,
    type ZodRecordDef,
    type ZodTypeAny,
    type ZodTypeDef,
    type ZodUnionDef,
} from 'zod';

/**
 * Checks if a Zod type definition matches a specific type name
 *
 * @param def - Zod type definition to check
 * @param typeName - The type name to match against
 * @returns True if the definition matches the type name
 */
export function isDefType(def: ZodTypeDef, typeName: ZodFirstPartyTypeKind) {
    return 'typeName' in def && def.typeName === typeName;
}

/**
 * Type guard to check if a Zod type definition is an array definition
 *
 * @param def - Zod type definition to check
 * @returns True if the definition is an array definition
 */
export function isArrayDef(def: ZodTypeDef): def is ZodArrayDef {
    return isDefType(def, ZodFirstPartyTypeKind.ZodArray);
}

/**
 * Type guard to check if a Zod type definition is an object definition
 *
 * @param def - Zod type definition to check
 * @returns True if the definition is an object definition
 */
export function isObjectDef(def: ZodTypeDef): def is ZodObjectDef {
    return isDefType(def, ZodFirstPartyTypeKind.ZodObject);
}

/**
 * Type guard to check if a Zod type definition is a record definition
 *
 * @param def - Zod type definition to check
 * @returns True if the definition is a record definition
 */
export function isRecordDef(def: ZodTypeDef): def is ZodRecordDef {
    return isDefType(def, ZodFirstPartyTypeKind.ZodRecord);
}

/**
 * Type guard to check if a Zod type definition is a union definition
 *
 * @param def - Zod type definition to check
 * @returns True if the definition is a union definition
 */
export function isUnionDef(def: ZodTypeDef): def is ZodUnionDef {
    return isDefType(def, ZodFirstPartyTypeKind.ZodUnion);
}

/**
 * Type guard to check if a schema is a Zod effects schema (refine, transform, etc.)
 *
 * @param schema - Schema object to check
 * @returns True if the schema is a Zod effects schema
 */
export function isZodEffects<T extends ZodTypeAny>(schema: object): schema is ZodEffects<T> {
    return 'sourceType' in schema;
}

/**
 * Type guard to check if a Zod type definition is an effects definition
 *
 * @param def - Zod type definition to check
 * @returns True if the definition is an effects definition
 */
export function isZodEffectsDef(def: ZodTypeDef): def is ZodEffectsDef {
    return isDefType(def, ZodFirstPartyTypeKind.ZodEffects);
}
