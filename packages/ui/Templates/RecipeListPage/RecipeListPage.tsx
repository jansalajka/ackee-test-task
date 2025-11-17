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
 */
export function RecipeListPageTemplate({
    header,
    recipes,
    getRecipeHref,
    translate,
    getRecipeImage,
    convertScoreToStars,
}: RecipeListPageTemplateProps) {
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

