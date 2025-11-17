import type { Meta, StoryObj } from '@storybook/nextjs';

import type { RecipeList as RecipeListType } from '@workspace/api';

import { colors } from '../../constants';
import { PlusIcon } from '../../Atoms';
import { Header } from '../../Organisms';
import { realTranslate, mockGetRecipeImage, mockConvertScoreToStars } from '../../../../apps/web/.storybook/utils';
import { RecipeListPageTemplate } from './RecipeListPage';

const meta = {
    title: 'UI/Templates/RecipeListPage',
    component: RecipeListPageTemplate,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        translate: realTranslate,
        getRecipeImage: mockGetRecipeImage,
        convertScoreToStars: mockConvertScoreToStars,
        getRecipeHref: (id: string) => `/recipes/${id}`,
    },
} satisfies Meta<typeof RecipeListPageTemplate>;

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

const defaultHeader = (
    <Header
        headline={realTranslate('TRANS_RECIPES')}
        right={<PlusIcon color={colors.blue} />}
    />
);

export const Default: Story = {
    args: {
        header: defaultHeader,
        recipes: mockRecipes,
    },
};

export const SingleRecipe: Story = {
    args: {
        header: defaultHeader,
        recipes: [mockRecipes[0]],
    },
};

export const ManyRecipes: Story = {
    args: {
        header: defaultHeader,
        recipes: [
            ...mockRecipes,
            {
                id: '4',
                name: 'Rice and Peas',
                score: 88,
                duration: 25,
            },
            {
                id: '5',
                name: 'Fried Plantains',
                score: 75,
                duration: 15,
            },
            {
                id: '6',
                name: 'Callaloo',
                score: 82,
                duration: 20,
            },
        ],
    },
};

