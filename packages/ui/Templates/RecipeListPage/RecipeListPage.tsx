import type { ReactNode } from 'react';

import type { RecipeList as RecipeListType } from '@workspace/api';

import { Main } from '../../Organisms';
import { RecipeList } from '../../Organisms';

export interface RecipeListPageTemplateProps {
    header: ReactNode;
    recipes: RecipeListType;
    getRecipeHref: (recipeId: string) => string;
    translate: (key: string, params?: Record<string, string | number>) => string;
    getRecipeImage: (recipeId: string) => string;
    convertScoreToStars: (score: number) => number;
}

/**
 * Template for recipe list page
 * Accepts recipes as props instead of fetching them
 *
 * @param header - Header component to display
 * @param recipes - List of recipes to display
 * @param getRecipeHref - Function to generate href for each recipe
 * @param translate - Translation function for i18n
 * @param getRecipeImage - Function to get image URL for each recipe
 * @param convertScoreToStars - Function to convert recipe score to star count
 * @returns Recipe list page template
 */
export function RecipeListPageTemplate({
    header,
    recipes,
    getRecipeHref,
    translate,
    getRecipeImage,
    convertScoreToStars,
}: RecipeListPageTemplateProps): JSX.Element {
    return (
        <>
            {header}
            <Main>
                <RecipeList
                    recipes={recipes}
                    getRecipeHref={getRecipeHref}
                    translate={translate}
                    getRecipeImage={getRecipeImage}
                    convertScoreToStars={convertScoreToStars}
                />
            </Main>
        </>
    );
}

