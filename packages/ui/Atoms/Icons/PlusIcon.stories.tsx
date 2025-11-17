import type { Meta, StoryObj } from '@storybook/nextjs';

import { colors } from '../../constants';
import { PlusIcon } from './PlusIcon';

const meta = {
    title: 'UI/Atoms/Icons/PlusIcon',
    component: PlusIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'number', min: 8, max: 64, step: 4 },
        },
        color: {
            control: 'color',
        },
    },
} satisfies Meta<typeof PlusIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        color: colors.blue,
        size: 24,
    },
};

export const Small: Story = {
    args: {
        color: colors.pink,
        size: 16,
    },
};

export const Large: Story = {
    args: {
        color: colors.blue,
        size: 32,
    },
};

export const CustomColor: Story = {
    args: {
        color: colors.pink,
        size: 24,
    },
};
