import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFela } from 'react-fela';

import { useRecipe } from '@workspace/api';

import { routes } from '~constants';
import { colors, HeaderHoverColorEnum } from '@workspace/ui';
import { useTrans } from '~modules/trans';
import { cookies } from '~utils/cookies';
import { convertScoreToStars } from '~utils/convertScoreToStars';
import { getRecipeImage } from '~utils/getRecipeImage';
import { ArrowLeftIcon, ErrorPageTemplate, Header, LoadingPageTemplate, PlusIcon, RecipeDetailPageTemplate, RecipePageHeader } from '@workspace/ui';

import {
    getBlurredBackgroundStyles,
    getHeaderContentContainerStyles,
    headerBottomStyles,
    headerSectionStyles,
    recipeTitleStyles,
} from './[id].styles';

/**
 * Recipe detail page
 */
const RecipeDetailPage: NextPage = () => {
    const trans = useTrans();
    const router = useRouter();
    const { css } = useFela();
    const { id } = router.query;

    const recipeId = typeof id === 'string' ? id : undefined;
    const { data: recipe, isLoading, isError, error } = useRecipe(recipeId);

    if (isLoading) {
        return <LoadingPageTemplate header={<RecipePageHeader homeHref={routes.home} newRecipeHref={routes.recipeNew} />} />;
    }

    if (isError) {
        const errorMessage = error instanceof Error ? error.message : trans.translate('TRANS_UNKNOWN_ERROR');

        return (
            <ErrorPageTemplate
                header={<RecipePageHeader homeHref={routes.home} newRecipeHref={routes.recipeNew} />}
                title={trans.translate('TRANS_ERROR_LOADING_RECIPE')}
                message={errorMessage}
            />
        );
    }

    if (!recipe) {
        return (
            <ErrorPageTemplate
                header={<RecipePageHeader homeHref={routes.home} newRecipeHref={routes.recipeNew} />}
                title={trans.translate('TRANS_ERROR_LOADING_RECIPE')}
                message={trans.translate('TRANS_RECIPE_NOT_FOUND')}
            />
        );
    }

    const recipeImage = getRecipeImage(recipe.id);

    const headerContent = (
        <div className={css(headerSectionStyles)}>
            <div className={css(getBlurredBackgroundStyles(recipeImage))} aria-hidden="true" />
            <div className={css(getHeaderContentContainerStyles(recipeImage))}>
                <div className={css(headerBottomStyles)}>
                    <h1 className={css(recipeTitleStyles)}>{recipe.name}</h1>
                </div>
            </div>
        </div>
    );

    const header = (
        <Header
            headline=""
            left={
                <Link href={routes.home} aria-label={trans.translate('TRANS_NAVIGATE_BACK')}>
                    <ArrowLeftIcon color={colors.white} />
                </Link>
            }
            right={
                <Link href={routes.recipeNew} aria-label={trans.translate('TRANS_ADD_NEW_RECIPE')}>
                    <PlusIcon color={colors.white} />
                </Link>
            }
            content={headerContent}
            hoverColor={HeaderHoverColorEnum.BLUE}
        />
    );

    return (
        <RecipeDetailPageTemplate
            header={header}
            recipe={recipe}
            dependencies={{
                translate: trans.translate.bind(trans),
                getRecipeImage,
                convertScoreToStars,
                cookies,
            }}
        />
    );
};

export default RecipeDetailPage;

