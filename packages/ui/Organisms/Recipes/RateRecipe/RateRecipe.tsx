import { useRateRecipe } from '@workspace/api';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { z } from 'zod';
import { StarIcon } from '../../../Atoms';
import { colors } from '../../../constants';
import {
    errorMessageStyles,
    ratingSectionStyles,
    ratingSectionTitleStyles,
    ratingStarsContainerStyles,
    starButtonDisabledStyles,
    starButtonStyles,
} from './RateRecipe.styles';

const COOKIE_NAME_PREFIX = 'recipe_rating_';
const recipeRatingSchema = z.coerce.number().int().min(1).max(5);

export interface RateRecipeProps {
    recipeId: string;
}

export interface RateRecipeDependencies {
    translate: (key: string, params?: Record<string, string | number>) => string;
    cookies: {
        get: (name: string) => string | undefined;
        set: (name: string, value: string, days?: number) => void;
    };
}

/**
 * Recipe rating component that allows users to rate recipes with stars
 *
 * @param recipeId - ID of the recipe to rate
 * @param translate - Translation function for i18n
 * @param cookies - Cookie utility functions for storing ratings
 * @returns Recipe rating element
 */
export function RateRecipe({ recipeId, translate, cookies }: RateRecipeProps & RateRecipeDependencies) {
    const { css } = useFela();
    const [selectedRating, setSelectedRating] = useState<number | null>(() => {
        if (!cookies) {
            return null;
        }

        return getRecipeRating(recipeId, cookies);
    });

    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const addRating = useRateRecipe();

    const handleStarClick = (rating: number) => {
        if (selectedRating || addRating.isPending) {
            return;
        }

        setSelectedRating(rating);
        addRating.mutate(
            {
                recipeId,
                data: { score: rating },
            },
            {
                onSuccess: () => {
                    setRecipeRating(recipeId, rating, cookies);
                },
            },
        );
    };

    const handleStarHover = (rating: number) => {
        if (selectedRating || addRating.isPending) {
            return;
        }
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(null);
    };

    const displayRating = hoveredRating ?? selectedRating ?? 0;
    const hasRated = selectedRating !== null;

    if (hasRated) {
        return (
            <div className={css(ratingSectionStyles)}>
                <h3 className={css(ratingSectionTitleStyles)}>{translate('TRANS_RATE_RECIPE')}</h3>
                <div className={css(ratingStarsContainerStyles)}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon
                            key={index}
                            filled={index < selectedRating}
                            color={colors.white}
                            size={48}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={css(ratingSectionStyles)}>
            <h3 className={css(ratingSectionTitleStyles)}>{translate('TRANS_RATE_RECIPE')}</h3>
            <div className={css(ratingStarsContainerStyles)}>
                {Array.from({ length: 5 }, (_, index) => {
                    const starRating = index + 1;
                    const isFilled = starRating <= displayRating;
                    const isClickable = !addRating.isPending;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleStarClick(starRating)}
                            onMouseEnter={() => handleStarHover(starRating)}
                            onMouseLeave={handleStarLeave}
                            disabled={!isClickable}
                            className={css(isClickable ? starButtonStyles : starButtonDisabledStyles)}
                            aria-label={translate('TRANS_RATE_STARS', { stars: starRating })}
                        >
                            <StarIcon
                                filled={isFilled}
                                color={colors.white}
                                size={48}
                            />
                        </button>
                    );
                })}
            </div>
            {addRating.isError && (
                <div className={css(errorMessageStyles)}>
                    {translate('TRANS_ERROR_RATING_RECIPE')}
                </div>
            )}
        </div>
    );
}

/**
 * Gets the stored rating for a recipe from cookies
 *
 * @param recipeId - ID of the recipe
 * @param cookies - Cookie utility functions
 * @returns Rating value (1-5) or null if not found/invalid
 */
function getRecipeRating(recipeId: string, cookies: RateRecipeDependencies['cookies']): number | null {
    const cookieValue = cookies.get(`${COOKIE_NAME_PREFIX}${recipeId}`);

    if (!cookieValue) {
        return null;
    }

    const result = recipeRatingSchema.safeParse(cookieValue);

    return result.success ? result.data : null;
}

/**
 * Stores a rating for a recipe in cookies
 *
 * @param recipeId - ID of the recipe
 * @param rating - Rating value (1-5)
 * @param cookies - Cookie utility functions
 */
function setRecipeRating(recipeId: string, rating: number, cookies: RateRecipeDependencies['cookies']): void {
    cookies.set(`${COOKIE_NAME_PREFIX}${recipeId}`, rating.toString());
}
