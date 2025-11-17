import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFela } from 'react-fela';
import { useRouter } from 'next/router';
import { useCreateRecipe } from '@workspace/api';
import type { CreateRecipeRequest } from '@workspace/api';
import { useLocalizedResolver } from '~modules/form/hooks';
import { required } from '~modules/form/validators';
import { colors } from '@workspace/ui';
import { routes } from '~constants';
import { InputSizeEnum } from '~constants/inputSizes';
import { useTrans } from '~modules/trans';
import { Button, Input, PlusIcon, Textarea } from '@workspace/ui';

import {
    errorMessageStyles,
    firstSectionHeaderStyles,
    formStyles,
} from './NewRecipeForm.styles';

const createRecipeSchema = (trans: ReturnType<typeof useTrans>) => z.object({
    name: required.refine(
        (value) => value.toLowerCase().includes('ackee'),
        {
            message: trans.translate('TRANS_RECIPE_NAME_MUST_CONTAIN_ACKEE'),
        },
    ),
    description: z.string().optional(),
    ingredients: z.array(z.string()).optional(),
    duration: z
        .number({
            required_error: trans.translate('TRANS_DURATION_REQUIRED'),
            invalid_type_error: trans.translate('TRANS_DURATION_MUST_BE_NUMBER'),
        })
        .min(1, trans.translate('TRANS_DURATION_MIN_1')),
    info: z.string().optional(),
});

type CreateRecipeFormData = z.infer<ReturnType<typeof createRecipeSchema>>;

export interface NewRecipeFormProps {
    onPendingChange?: (isPending: boolean) => void;
}

export function NewRecipeForm({ onPendingChange }: NewRecipeFormProps) {
    const trans = useTrans();
    const createRecipe = useCreateRecipe();
    const router = useRouter();
    const { css } = useFela();
    const resolver = useLocalizedResolver(createRecipeSchema(trans));
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<CreateRecipeFormData>({
        resolver,
        defaultValues: {
            ingredients: [''],
        },
    });

    const ingredients = watch('ingredients') || [''];

    useEffect(() => {
        onPendingChange?.(createRecipe.isPending);
    }, [createRecipe.isPending, onPendingChange]);

    const addIngredient = () => {
        setValue('ingredients', [...ingredients, '']);
    };

    const onSubmit = async (data: CreateRecipeFormData) => {
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

        try {
            const result = await createRecipe.mutateAsync(requestData);

            if (!result?.id) {
                router.push(routes.home);

                return;
            }

            router.push(`/recipes/${result.id}`);
        } catch (error) {
            throw error;
        }
    };

    return (
        <form id="recipe-form" onSubmit={handleSubmit(onSubmit)} className={css(formStyles)}>
            <Input
                id="name"
                type="text"
                label={trans.translate('TRANS_RECIPE_NAME')}
                error={errors.name?.message}
                {...register('name')}
            />

            <Textarea
                id="description"
                label={trans.translate('TRANS_INTRO_TEXT')}
                error={errors.description?.message}
                {...register('description')}
            />

            <div className={css(firstSectionHeaderStyles)}>{trans.translate('TRANS_INGREDIENTS')}</div>

            {ingredients.map((_, index) => (
                <Input
                    key={index}
                    id={`ingredients-${index}`}
                    type="text"
                    placeholder={index === 0 ? trans.translate('TRANS_YOUR_INGREDIENT') : trans.translate('TRANS_NEXT_INGREDIENT')}
                    error={errors.ingredients?.[index]?.message}
                    {...register(`ingredients.${index}`)}
                />
            ))}

            <Button type="button" onClick={addIngredient} icon={<PlusIcon color={colors.pink} size={16} />}>
                <span>{trans.translate('TRANS_ADD')}</span>
            </Button>

            <Textarea
                id="info"
                label={trans.translate('TRANS_PREPARATION')}
                error={errors.info?.message}
                {...register('info')}
            />

            <Input
                id="duration"
                type="number"
                min="1"
                label={trans.translate('TRANS_TIME')}
                error={errors.duration?.message}
                size={InputSizeEnum.SMALL}
                {...register('duration', { valueAsNumber: true })}
            />

            {createRecipe.isError && (
                <div className={css(errorMessageStyles)}>
                    <p>{trans.translate('TRANS_ERROR_CREATING_RECIPE')}</p>
                    <p>{createRecipe.error.message}</p>
                </div>
            )}
        </form>
    );
}

