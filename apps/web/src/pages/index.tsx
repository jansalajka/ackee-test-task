import type { NextPage } from 'next';
import Link from 'next/link';

import { useRecipes } from '@workspace/api';
import {
    colors,
    ErrorPageTemplate,
    Header,
    LoadingPageTemplate,
    PlusIcon,
    RecipeListPageTemplate,
} from '@workspace/ui';

import { routes } from '~constants';
import { useTrans } from '~modules/trans';
import { convertScoreToStars } from '~utils/convertScoreToStars';
import { getRecipeImage } from '~utils/getRecipeImage';

/**
 * Home page - displays list of recipes
 */
const Home: NextPage = () => {
    const trans = useTrans();
    const { data: recipes, isLoading, isError, error } = useRecipes();

    const header = (
        <Header
            headline={trans.translate('TRANS_RECIPES')}
            right={
                <Link href={routes.recipeNew} aria-label={trans.translate('TRANS_ADD_NEW_RECIPE')}>
                    <PlusIcon color={colors.blue} />
                </Link>
            }
        />
    );

    if (isLoading) {
        return <LoadingPageTemplate header={header} />;
    }

    if (isError) {
        const errorMessage = error instanceof Error ? error.message : trans.translate('TRANS_UNKNOWN_ERROR_SHORT');

        return (
            <ErrorPageTemplate
                header={header}
                title={trans.translate('TRANS_ERROR_LOADING_RECIPES')}
                message={errorMessage}
            />
        );
    }

    if (!recipes || recipes.length === 0) {
        return (
            <ErrorPageTemplate
                header={header}
                title={trans.translate('TRANS_RECIPES')}
                message={trans.translate('TRANS_NO_RECIPES_FOUND')}
            />
        );
    }

    return (
        <RecipeListPageTemplate
            header={header}
            recipes={recipes}
            getRecipeHref={id => `/recipes/${id}`}
            translate={trans.translate.bind(trans) as (key: string, params?: Record<string, string | number>) => string}
            getRecipeImage={getRecipeImage}
            convertScoreToStars={convertScoreToStars}
        />
    );
};

export default Home;
