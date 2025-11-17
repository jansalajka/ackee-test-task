import { useFela } from 'react-fela';

import type { RecipeList } from '@workspace/api';

import { RecipeItem } from '../RecipeItem';

import { listItemStyles, listStyles } from './RecipeList.styles';

export interface RecipeListProps {
    recipes: RecipeList;
    getRecipeHref: (recipeId: string) => string;
    translate: (key: string, params?: Record<string, string | number>) => string;
    getRecipeImage: (recipeId: string) => string;
    convertScoreToStars: (score: number) => number;
}

export function RecipeList({
    recipes,
    getRecipeHref,
    translate,
    getRecipeImage,
    convertScoreToStars,
}: RecipeListProps) {
    const { css } = useFela();

    return (
        <ul className={css(listStyles)}>
            {recipes.map((recipe, index) => (
                <li key={index} className={css(listItemStyles)}>
                    <RecipeItem
                        recipe={recipe}
                        href={getRecipeHref(recipe.id)}
                        translate={translate}
                        getRecipeImage={getRecipeImage}
                        convertScoreToStars={convertScoreToStars}
                    />
                </li>
            ))}
        </ul>
    );
}

