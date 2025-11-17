import type { ReactNode } from 'react';
import { useFela } from 'react-fela';

import type { RecipeDetail } from '@workspace/api';

import { colors } from '../../constants';
import { ClockIcon, StarIcon } from '../../Atoms/Icons';
import { Main } from '../../Organisms/Main';
import { RateRecipe } from '../../Organisms/Recipes/RateRecipe';
import {
    contentStyles,
    getBlurredBackgroundStyles,
    getHeaderContentContainerStyles,
    headerBottomStyles,
    headerSectionStyles,
    ingredientItemStyles,
    ingredientsListStyles,
    introTextStyles,
    pageStyles,
    preparationTextStyles,
    ratingBarContainerStyles,
    ratingBarStyles,
    ratingLeftStyles,
    ratingRightStyles,
    recipeTitleStyles,
    sectionHeadingStyles,
} from './RecipeDetailPage.styles';

export interface RecipeDetailPageTemplateDependencies {
    translate: (key: string, params?: Record<string, string | number>) => string;
    getRecipeImage: (recipeId: string) => string;
    convertScoreToStars: (score: number) => number;
    cookies: {
        get: (name: string) => string | undefined;
        set: (name: string, value: string, days?: number) => void;
    };
}

export interface RecipeDetailPageTemplateProps {
    header: ReactNode;
    recipe: RecipeDetail;
    dependencies: RecipeDetailPageTemplateDependencies;
}

/**
 * Template for recipe detail page
 * Accepts recipe as prop instead of fetching it
 *
 * @param header - Header component to display
 * @param recipe - Recipe detail data to display
 * @param dependencies - Required dependencies (translate, getRecipeImage, convertScoreToStars, cookies)
 * @returns Recipe detail page template
 */
export function RecipeDetailPageTemplate({ header, recipe, dependencies }: RecipeDetailPageTemplateProps): JSX.Element {
    const { css } = useFela();
    const { translate, getRecipeImage, convertScoreToStars, cookies } = dependencies;

    const stars = convertScoreToStars(recipe.score);
    const recipeImage = getRecipeImage(recipe.id);

    return (
        <div className={css(pageStyles)}>
            {header}

            <div className={css(ratingBarStyles)} role="region" aria-label={translate('TRANS_RECIPE_RATING', { stars })}>
                <div className={css(ratingBarContainerStyles)}>
                    <div className={css(ratingLeftStyles)} aria-label={translate('TRANS_RECIPE_RATING', { stars })}>
                        {Array.from({ length: stars }, (_, index) => (
                            <StarIcon
                                key={index}
                                filled={true}
                                color={colors.white}
                                size={32}
                            />
                        ))}
                    </div>
                    <div className={css(ratingRightStyles)} aria-label={translate('TRANS_RECIPE_DURATION', { duration: recipe.duration })}>
                        <ClockIcon color={colors.white} size={20} />
                        <span>{recipe.duration} {translate('TRANS_MIN')}</span>
                    </div>
                </div>
            </div>

            <Main>
                <div className={css(contentStyles)}>
                    {recipe.description && (
                        <p className={css(introTextStyles)}>{recipe.description}</p>
                    )}

                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <>
                            <h2 className={css(sectionHeadingStyles)}>{translate('TRANS_INGREDIENTS_SECTION')}</h2>
                            <ul className={css(ingredientsListStyles)}>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className={css(ingredientItemStyles)}>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {recipe.info && (
                        <>
                            <h2 className={css(sectionHeadingStyles)}>{translate('TRANS_PREPARATION_SECTION')}</h2>
                            <p className={css(preparationTextStyles)}>{recipe.info}</p>
                        </>
                    )}
                </div>
            </Main>

            {recipe.id && (
                <RateRecipe
                    recipeId={recipe.id}
                    translate={translate}
                    cookies={cookies}
                />
            )}
        </div>
    );
}

