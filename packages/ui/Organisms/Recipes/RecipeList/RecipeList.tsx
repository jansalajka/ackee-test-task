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

/**
 * Recipe list component that displays a list of recipe items
 *
 * @param recipes - List of recipes to display
 * @param getRecipeHref - Function to generate href for each recipe
 * @param translate - Translation function for i18n
 * @param getRecipeImage - Function to get image URL for each recipe
 * @param convertScoreToStars - Function to convert recipe score to star count
 * @returns Recipe list element
 */
export function RecipeList({
    recipes,
    getRecipeHref,
    translate,
    getRecipeImage,
    convertScoreToStars,
}: RecipeListProps): JSX.Element {
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
