import type { Meta, StoryObj } from '@storybook/nextjs';
import { colors } from '../../constants';
import { StarIcon } from './StarIcon';

const meta = {
    title: 'UI/Atoms/Icons/StarIcon',
    component: StarIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        filled: {
            control: 'boolean',
        },
        size: {
            control: { type: 'number', min: 8, max: 64, step: 4 },
        },
        color: {
            control: 'color',
        },
    },
} satisfies Meta<typeof StarIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
    args: {
        filled: false,
        color: colors.pink,
        size: 24,
    },
};

export const Filled: Story = {
    args: {
        filled: true,
        color: colors.pink,
        size: 24,
    },
};

export const Small: Story = {
    args: {
        filled: true,
        color: colors.pink,
        size: 16,
    },
};

export const Large: Story = {
    args: {
        filled: true,
        color: colors.pink,
        size: 48,
    },
};

export const CustomColor: Story = {
    args: {
        filled: true,
        color: colors.blue,
        size: 32,
    },
};

