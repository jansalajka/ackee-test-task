import type { Meta, StoryObj } from '@storybook/nextjs';

import { realTranslate } from '../../../../../apps/web/.storybook/utils';
import { RateRecipe } from './RateRecipe';

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

const meta = {
    title: 'UI/Organisms/Recipes/RateRecipe',
    component: RateRecipe,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        translate: realTranslate,
        cookies: mockCookies,
    },
    decorators: [
        (Story, context) => (
            <Story
                {...context.args}
                translate={context.args.translate ?? realTranslate}
                cookies={context.args.cookies ?? mockCookies}
            />
        ),
    ],
} satisfies Meta<typeof RateRecipe>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        recipeId: 'recipe-1',
    },
};

export const AlreadyRated: Story = {
    args: {
        recipeId: 'recipe-2',
    },
    decorators: [
        (Story, context) => {
            mockCookies.set('recipe_rating_recipe-2', '4');

            return (
                <Story
                    {...context.args}
                    translate={context.args.translate ?? realTranslate}
                    cookies={context.args.cookies ?? mockCookies}
                />
            );
        },
    ],
};
