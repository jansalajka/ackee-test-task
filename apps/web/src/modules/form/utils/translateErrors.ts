import type { FieldErrors } from 'react-hook-form';
import type { ZodArrayDef, ZodObjectDef, ZodRecordDef, ZodTypeAny, ZodTypeDef } from 'zod';

import { isMessageKey, type useIntl } from '@workspace/localization';

import { isArrayDef, isObjectDef, isRecordDef } from './guards';
import { unwrapPossibleZodEffectsDef } from './unwrap';

interface TranslateUtils {
    formatMessage: ReturnType<typeof useIntl>['formatMessage'];
}

/**
 * Translates error messages if they are message keys
 *
 * @param value - Error object that may contain a message key
 * @param formatMessage - Function to format internationalized messages
 * @returns Translated error object if message is a key, otherwise original value
 */
function possiblyTranslate(value: object, { formatMessage }: TranslateUtils) {
    if (value && 'message' in value && typeof value.message === 'string' && isMessageKey(value.message)) {
        return {
            ...value,
            message: formatMessage({ id: value.message }),
        };
    }

    return value;
}

/**
 * Translates errors from nested schema structures (objects, records, arrays)
 *
 * @param def - Zod schema definition
 * @param errors - Form field errors to translate
 * @param utils - Translation utilities
 * @returns Translated error object
 */
function translateInnerSchemaErrors(def: ZodTypeAny, errors: any, utils: TranslateUtils): object {
    const unwrappedDef = unwrapPossibleZodEffectsDef(def);

    if (isObjectDef(unwrappedDef)) {
        return translateObjectErrors(unwrappedDef, errors, utils);
    }
    if (isRecordDef(unwrappedDef)) {
        return translateRecordErrors(unwrappedDef, errors, utils);
    }
    if (isArrayDef(unwrappedDef)) {
        return translateArrayErrors(unwrappedDef, errors, utils);
    }

    return errors;
}

/**
 * Translates form errors recursively based on schema structure
 *
 * @param errors - Form field errors to translate
 * @param utils - Translation utilities
 * @param getInnerDefOrNull - Function to get inner schema definition for a field key
 * @returns Translated error object
 */
function translateErrors(
    errors: FieldErrors,
    utils: TranslateUtils,
    getInnerDefOrNull: (key: string) => ZodTypeAny | null,
) {
    const entries = Object.entries(errors).map(([key, value]) => {
        if (typeof value !== 'object') {
            return [key, value];
        }
        const innerDef = getInnerDefOrNull(key);

        if (innerDef) {
            value = translateInnerSchemaErrors(innerDef, value, utils);
        }

        return [key, possiblyTranslate(value, utils)];
    });

    return Object.fromEntries(entries);
}

/**
 * Translates errors for array field types
 *
 * @param def - Zod array definition
 * @param errors - Form field errors to translate
 * @param utils - Translation utilities
 * @returns Translated error object for array fields
 */
function translateArrayErrors(def: ZodArrayDef, errors: FieldErrors, utils: TranslateUtils) {
    return translateErrors(errors, utils, key => {
        const isKey = !isNaN(Number(key));

        if (isKey) {
            return def.type._def;
        }

        return null;
    });
}

/**
 * Translates errors for record field types
 *
 * @param def - Zod record definition
 * @param errors - Form field errors to translate
 * @param utils - Translation utilities
 * @returns Translated error object for record fields
 */
export function translateRecordErrors(def: ZodRecordDef, errors: FieldErrors, utils: TranslateUtils) {
    return translateErrors(errors, utils, key => {
        const isKey = def.keyType.safeParse(key).success;

        if (isKey) {
            return def.valueType._def;
        }

        return null;
    });
}

/**
 * Translates errors for object field types
 *
 * @param def - Zod object definition
 * @param errors - Form field errors to translate
 * @param utils - Translation utilities
 * @returns Translated error object for object fields
 */
export function translateObjectErrors(def: ZodObjectDef, errors: FieldErrors, utils: TranslateUtils) {
    const shape = def.shape();

    return translateErrors(errors, utils, key => {
        return shape[key]?._def ?? null;
    });
}

/**
 * Translates form errors based on the schema type definition
 *
 * @param def - Zod type definition (object, record, or union)
 * @param errors - Form field errors to translate
 * @param formatMessage - Function to format internationalized messages
 * @returns Translated error object
 * @throws Error if an unsupported definition type is provided
 */
export function translateErrorsOfDef(def: ZodTypeDef, errors: FieldErrors, { formatMessage }: TranslateUtils) {
    if (isObjectDef(def)) {
        return translateObjectErrors(def, errors, { formatMessage });
    }

    if (isRecordDef(def)) {
        return translateRecordErrors(def, errors, { formatMessage });
    }

    throw new Error('invalid def received, ' + String(JSON.stringify(def, null, 2)));
}
