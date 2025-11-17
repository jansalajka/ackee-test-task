import Link from 'next/link';
import { useFela } from 'react-fela';
import type { RecipeListItem } from '@workspace/api';
import Image from 'next/image';
import { colors } from '../../../constants';
import { ClockIcon } from '../../../Atoms/Icons';
import { StarRating } from '../../../Molecules';

import {
    contentStyles,
    imageStyles,
    itemStyles,
    nameStyles,
    ratingContainerStyles,
    timeStyles,
} from './RecipeItem.styles';

export interface RecipeItemProps {
    recipe: RecipeListItem;
    href: string;
    translate: (key: string, params?: Record<string, string | number>) => string;
    getRecipeImage: (recipeId: string) => string;
    convertScoreToStars: (score: number) => number;
}

/**
 * Recipe item component that displays a single recipe in a list
 *
 * @param recipe - Recipe data to display
 * @param href - Link URL for the recipe
 * @param translate - Translation function for i18n
 * @param getRecipeImage - Function to get image URL for the recipe
 * @param convertScoreToStars - Function to convert recipe score to star count
 * @returns Recipe item element with link
 */
export function RecipeItem({ recipe, href, translate, getRecipeImage, convertScoreToStars }: RecipeItemProps): JSX.Element {
    const { css } = useFela();

    const recipeImage = getRecipeImage(recipe.id);
    const stars = convertScoreToStars(recipe.score);

    return (
        <Link href={href} className={css(itemStyles)}>
            <Image
                src={recipeImage}
                alt={translate('TRANS_RECIPE_IMAGE', { name: recipe.name })}
                width={96}
                height={96}
                className={css(imageStyles)}
            />
            <div className={css(contentStyles)}>
                <h2 className={css(nameStyles)}>{recipe.name}</h2>
                <div className={css(ratingContainerStyles)} aria-label={translate('TRANS_RECIPE_RATING', { stars })}>
                    <StarRating stars={stars} starColor={colors.pink} />
                </div>
                <div className={css(timeStyles)} aria-label={translate('TRANS_RECIPE_DURATION', { duration: recipe.duration })}>
                    <ClockIcon color={colors.gray.dark} />
                    <span>{recipe.duration} min</span>
                </div>
            </div>
        </Link>
    );
}
