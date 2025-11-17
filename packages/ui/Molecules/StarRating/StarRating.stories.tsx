import type { Meta, StoryObj } from '@storybook/nextjs';

import { colors } from '../../constants';
import { StarRating } from './StarRating';

const meta = {
    title: 'UI/Molecules/StarRating',
    component: StarRating,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        stars: {
            control: { type: 'number', min: 0, max: 5, step: 1 },
        },
        totalStars: {
            control: { type: 'number', min: 1, max: 10, step: 1 },
        },
        starColor: {
            control: 'color',
        },
    },
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        stars: 3,
        starColor: colors.pink,
    },
};

export const FullRating: Story = {
    args: {
        stars: 5,
        starColor: colors.pink,
    },
};

export const NoRating: Story = {
    args: {
        stars: 0,
        starColor: colors.pink,
    },
};

export const CustomColor: Story = {
    args: {
        stars: 4,
        starColor: colors.blue,
    },
};

export const CustomTotalStars: Story = {
    args: {
        stars: 7,
        totalStars: 10,
        starColor: colors.pink,
    },
};
