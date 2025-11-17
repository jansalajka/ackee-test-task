import type { Meta, StoryObj } from '@storybook/nextjs';
import type { RecipeListItem } from '@workspace/api';
import { realTranslate, mockGetRecipeImage, mockConvertScoreToStars } from '../../../../../apps/web/.storybook/utils';
import { RecipeItem } from './RecipeItem';

const meta = {
    title: 'UI/Organisms/Recipes/RecipeItem',
    component: RecipeItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        translate: realTranslate,
        getRecipeImage: mockGetRecipeImage,
        convertScoreToStars: mockConvertScoreToStars,
        href: '/recipes/1',
    },
    decorators: [
        (Story, context) => {
            const { href, recipe, translate, getRecipeImage, convertScoreToStars, ...restArgs } = context.args;
            // Ensure href is always a valid string - set it last to override any value from restArgs
            const finalHref = (typeof href === 'string' && href.trim() !== '') ? href : '/recipes/1';

            return (
                <Story
                    {...restArgs}
                    recipe={recipe}
                    translate={translate ?? realTranslate}
                    getRecipeImage={getRecipeImage ?? mockGetRecipeImage}
                    convertScoreToStars={convertScoreToStars ?? mockConvertScoreToStars}
                    href={finalHref}
                />
            );
        },
    ],
} satisfies Meta<typeof RecipeItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockRecipe: RecipeListItem = {
    id: '1',
    name: 'Ackee and Saltfish',
    score: 85,
    duration: 30,
};

export const Default: Story = {
    args: {
        recipe: mockRecipe,
        href: '/recipes/1',
    },
};

export const HighRating: Story = {
    args: {
        recipe: {
            ...mockRecipe,
            score: 95,
        },
        href: '/recipes/2',
    },
};

export const LowRating: Story = {
    args: {
        recipe: {
            ...mockRecipe,
            score: 25,
        },
        href: '/recipes/3',
    },
};

export const LongName: Story = {
    args: {
        recipe: {
            ...mockRecipe,
            name: 'Ackee and Saltfish with Fried Plantains and Callaloo',
        },
        href: '/recipes/4',
    },
};

