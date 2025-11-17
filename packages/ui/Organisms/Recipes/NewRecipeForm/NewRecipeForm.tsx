import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFela } from 'react-fela';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { CreateRecipeRequest } from '@workspace/api';

import { Button, Input, PlusIcon, Textarea } from '../../../Atoms';
import { colors, InputSizeEnum } from '../../../constants';
import {
    errorMessageStyles,
    firstSectionHeaderStyles,
    formStyles,
} from './NewRecipeForm.styles';

const createRecipeSchema = (translate: (key: string) => string) => z.object({
    name: z.string().min(1, translate('TRANS_RECIPE_NAME_MUST_CONTAIN_ACKEE')).refine(
        (value) => value.toLowerCase().includes('ackee'),
        {
            message: translate('TRANS_RECIPE_NAME_MUST_CONTAIN_ACKEE'),
        },
    ),
    description: z.string().optional(),
    ingredients: z.array(z.string()).optional(),
    duration: z
        .number({
            required_error: translate('TRANS_DURATION_REQUIRED'),
            invalid_type_error: translate('TRANS_DURATION_MUST_BE_NUMBER'),
        })
        .min(1, translate('TRANS_DURATION_MIN_1')),
    info: z.string().optional(),
});

type CreateRecipeFormData = z.infer<ReturnType<typeof createRecipeSchema>>;

export interface NewRecipeFormDependencies {
    translate: (key: string, params?: Record<string, string | number>) => string;
    onSubmit: (data: CreateRecipeRequest) => Promise<void>;
    isPending?: boolean;
    error?: Error | null;
}

export interface NewRecipeFormProps {
    dependencies: NewRecipeFormDependencies;
    onPendingChange?: (isPending: boolean) => void;
}

export function NewRecipeForm({ dependencies, onPendingChange }: NewRecipeFormProps) {
    const { translate, onSubmit, isPending = false, error } = dependencies;
    const { css } = useFela();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<CreateRecipeFormData>({
        resolver: zodResolver(createRecipeSchema(translate)),
        defaultValues: {
            ingredients: [''],
        },
    });

    const ingredients = watch('ingredients') || [''];

    useEffect(() => {
        onPendingChange?.(isPending);
    }, [isPending, onPendingChange]);

    const addIngredient = () => {
        setValue('ingredients', [...ingredients, '']);
    };

    const handleFormSubmit = async (data: CreateRecipeFormData) => {
        const ingredientsArray = data.ingredients
            ? data.ingredients.filter((item) => item.trim().length > 0)
            : undefined;

        const requestData: CreateRecipeRequest = {
            name: data.name,
            description: data.description || undefined,
            ingredients: ingredientsArray && ingredientsArray.length > 0 ? ingredientsArray : undefined,
            duration: data.duration,
            info: data.info || undefined,
        };

        await onSubmit(requestData);
    };

    return (
        <form id="recipe-form" onSubmit={handleSubmit(handleFormSubmit)} className={css(formStyles)}>
            <Input
                id="name"
                type="text"
                label={translate('TRANS_RECIPE_NAME')}
                error={errors.name?.message}
                {...register('name')}
            />

            <Textarea
                id="description"
                label={translate('TRANS_INTRO_TEXT')}
                error={errors.description?.message}
                {...register('description')}
            />

            <div className={css(firstSectionHeaderStyles)}>{translate('TRANS_INGREDIENTS')}</div>

            {ingredients.map((_, index) => (
                <Input
                    key={index}
                    id={`ingredients-${index}`}
                    type="text"
                    placeholder={index === 0 ? translate('TRANS_YOUR_INGREDIENT') : translate('TRANS_NEXT_INGREDIENT')}
                    error={errors.ingredients?.[index]?.message}
                    {...register(`ingredients.${index}`)}
                />
            ))}

            <Button type="button" onClick={addIngredient} icon={<PlusIcon color={colors.pink} size={16} />}>
                <span>{translate('TRANS_ADD')}</span>
            </Button>

            <Textarea
                id="info"
                label={translate('TRANS_PREPARATION')}
                error={errors.info?.message}
                {...register('info')}
            />

            <Input
                id="duration"
                type="number"
                min="1"
                label={translate('TRANS_TIME')}
                error={errors.duration?.message}
                size={InputSizeEnum.SMALL}
                {...register('duration', { valueAsNumber: true })}
            />

            {error && (
                <div className={css(errorMessageStyles)}>
                    <p>{translate('TRANS_ERROR_CREATING_RECIPE')}</p>
                    <p>{error.message}</p>
                </div>
            )}
        </form>
    );
}

