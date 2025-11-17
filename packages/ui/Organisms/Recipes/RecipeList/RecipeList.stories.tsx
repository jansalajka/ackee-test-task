import type { Meta, StoryObj } from '@storybook/nextjs';
import type { RecipeList as RecipeListType } from '@workspace/api';
import { realTranslate, mockGetRecipeImage, mockConvertScoreToStars } from '../../../../../apps/web/.storybook/utils';
import { RecipeList } from './RecipeList';

const meta = {
    title: 'UI/Organisms/Recipes/RecipeList',
    component: RecipeList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        translate: realTranslate,
        getRecipeImage: mockGetRecipeImage,
        convertScoreToStars: mockConvertScoreToStars,
    },
    decorators: [
        (Story, context) => (
            <Story
                {...context.args}
                translate={context.args.translate ?? realTranslate}
                getRecipeImage={context.args.getRecipeImage ?? mockGetRecipeImage}
                convertScoreToStars={context.args.convertScoreToStars ?? mockConvertScoreToStars}
            />
        ),
    ],
} satisfies Meta<typeof RecipeList>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockRecipes: RecipeListType = [
    {
        id: '1',
        name: 'Ackee and Saltfish',
        score: 85,
        duration: 30,
    },
    {
        id: '2',
        name: 'Jerk Chicken',
        score: 92,
        duration: 45,
    },
    {
        id: '3',
        name: 'Curry Goat',
        score: 78,
        duration: 60,
    },
];

export const Default: Story = {
    args: {
        recipes: mockRecipes,
        getRecipeHref: (recipeId) => `/recipes/${recipeId}`,
    },
};

export const SingleItem: Story = {
    args: {
        recipes: [mockRecipes[0]],
        getRecipeHref: (recipeId) => `/recipes/${recipeId}`,
    },
};

export const ManyItems: Story = {
    args: {
        recipes: [
            ...mockRecipes,
            {
                id: '4',
                name: 'Escovitch Fish',
                score: 88,
                duration: 40,
            },
            {
                id: '5',
                name: 'Oxtail Stew',
                score: 90,
                duration: 120,
            },
            {
                id: '6',
                name: 'Rice and Peas',
                score: 75,
                duration: 25,
            },
        ],
        getRecipeHref: (recipeId) => `/recipes/${recipeId}`,
    },
};

