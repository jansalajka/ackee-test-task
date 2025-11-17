import type { Meta, StoryObj } from '@storybook/nextjs';

import { Loading } from './Loading';

const meta = {
    title: 'UI/Atoms/Loading',
    component: Loading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        width: {
            control: { type: 'number', min: 16, max: 128, step: 8 },
        },
        height: {
            control: { type: 'number', min: 16, max: 128, step: 8 },
        },
    },
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: 48,
        height: 48,
    },
};

export const Small: Story = {
    args: {
        width: 24,
        height: 24,
    },
};

export const Large: Story = {
    args: {
        width: 64,
        height: 64,
    },
};
