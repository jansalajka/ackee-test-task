import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useFela } from 'react-fela';

import type { RecipeDetail } from '@workspace/api';

import { mockConvertScoreToStars, mockGetRecipeImage, realTranslate } from '../../../../apps/web/.storybook/utils';
import { ArrowLeftIcon, PlusIcon } from '../../Atoms';
import { colors } from '../../constants';
import { Header } from '../../Organisms';
import { RecipeDetailPageTemplate } from './RecipeDetailPage';
import {
    getBlurredBackgroundStyles,
    getHeaderContentContainerStyles,
    headerBottomStyles,
    headerSectionStyles,
    recipeTitleStyles,
} from './RecipeDetailPage.styles';

const meta = {
    title: 'UI/Templates/RecipeDetailPage',
    component: RecipeDetailPageTemplate,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RecipeDetailPageTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Type for recipe in stories that allows optional fields for testing edge cases
 */
type RecipeDetailForStories = Omit<RecipeDetail, 'description' | 'ingredients' | 'info'> & {
    description?: string;
    ingredients?: string[];
    info?: string;
};

/**
 * Mock cookie implementation for Storybook
 */
const cookieStore = new Map<string, string>();

const mockCookies = {
    get: (name: string): string | undefined => {
        return cookieStore.get(name);
    },
    set: (name: string, value: string): void => {
        cookieStore.set(name, value);
    },
};

interface HeaderContentProps {
    recipeName: string;
    recipeImage: string;
}

function HeaderContent({ recipeName, recipeImage }: HeaderContentProps) {
    const { css } = useFela();

    return (
        <div className={css(headerSectionStyles)}>
            <div className={css(getBlurredBackgroundStyles(recipeImage))} aria-hidden='true' />
            <div className={css(getHeaderContentContainerStyles(recipeImage))}>
                <div className={css(headerBottomStyles)}>
                    <h1 className={css(recipeTitleStyles)}>{recipeName}</h1>
                </div>
            </div>
        </div>
    );
}

function createDefaultHeader(recipeName: string, recipeImage: string) {
    return (
        <Header
            headline=''
            left={<ArrowLeftIcon color={colors.white} />}
            right={<PlusIcon color={colors.white} />}
            content={<HeaderContent recipeName={recipeName} recipeImage={recipeImage} />}
        />
    );
}

const mockRecipe: RecipeDetailForStories = {
    id: '1',
    name: 'Ackee and Saltfish',
    score: 85,
    duration: 30,
    description: 'A traditional Jamaican breakfast dish made with ackee fruit and salted codfish.',
    ingredients: [
        '1 can ackee',
        '1 lb salted codfish',
        '1 onion, diced',
        '2 tomatoes, diced',
        '1 scotch bonnet pepper',
        '2 tbsp vegetable oil',
        'Black pepper to taste',
    ],
    info: 'Soak the codfish overnight to remove excess salt. Sauté onions and tomatoes, then add the codfish and ackee. Cook gently to avoid breaking the ackee.',
};

export const Default: Story = {
    args: {
        header: null as unknown as React.ReactNode,
        recipe: mockRecipe as RecipeDetail,
        dependencies: {
            translate: realTranslate,
            getRecipeImage: mockGetRecipeImage,
            convertScoreToStars: mockConvertScoreToStars,
            cookies: mockCookies,
        },
    },
    render: args => (
        <RecipeDetailPageTemplate
            {...args}
            header={createDefaultHeader(args.recipe.name, mockGetRecipeImage(args.recipe.id))}
        />
    ),
};

export const WithoutDescription: Story = {
    args: {
        header: null as unknown as ReactNode,
        recipe: {
            ...mockRecipe,
            description: undefined,
        } as unknown as RecipeDetail,
        dependencies: {
            translate: realTranslate,
            getRecipeImage: mockGetRecipeImage,
            convertScoreToStars: mockConvertScoreToStars,
            cookies: mockCookies,
        },
    },
    render: args => (
        <RecipeDetailPageTemplate
            {...args}
            header={createDefaultHeader(args.recipe.name, mockGetRecipeImage(args.recipe.id))}
        />
    ),
};

export const WithoutIngredients: Story = {
    args: {
        header: null as unknown as ReactNode,
        recipe: {
            ...mockRecipe,
            ingredients: undefined,
        } as unknown as RecipeDetail,
        dependencies: {
            translate: realTranslate,
            getRecipeImage: mockGetRecipeImage,
            convertScoreToStars: mockConvertScoreToStars,
            cookies: mockCookies,
        },
    },
    render: args => (
        <RecipeDetailPageTemplate
            {...args}
            header={createDefaultHeader(args.recipe.name, mockGetRecipeImage(args.recipe.id))}
        />
    ),
};

export const WithoutInfo: Story = {
    args: {
        header: null as unknown as ReactNode,
        recipe: {
            ...mockRecipe,
            info: undefined,
        } as unknown as RecipeDetail,
        dependencies: {
            translate: realTranslate,
            getRecipeImage: mockGetRecipeImage,
            convertScoreToStars: mockConvertScoreToStars,
            cookies: mockCookies,
        },
    },
    render: args => (
        <RecipeDetailPageTemplate
            {...args}
            header={createDefaultHeader(args.recipe.name, mockGetRecipeImage(args.recipe.id))}
        />
    ),
};

export const HighRating: Story = {
    args: {
        header: null as unknown as ReactNode,
        recipe: {
            ...mockRecipe,
            score: 95,
        } as RecipeDetail,
        dependencies: {
            translate: realTranslate,
            getRecipeImage: mockGetRecipeImage,
            convertScoreToStars: mockConvertScoreToStars,
            cookies: mockCookies,
        },
    },
    render: args => (
        <RecipeDetailPageTemplate
            {...args}
            header={createDefaultHeader(args.recipe.name, mockGetRecipeImage(args.recipe.id))}
        />
    ),
};
