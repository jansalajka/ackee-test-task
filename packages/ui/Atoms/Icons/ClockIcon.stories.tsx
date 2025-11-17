import type { Meta, StoryObj } from '@storybook/nextjs';
import { colors } from '../../constants';
import { ClockIcon } from './ClockIcon';

const meta = {
    title: 'UI/Atoms/Icons/ClockIcon',
    component: ClockIcon,
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
} satisfies Meta<typeof ClockIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        color: colors.gray.dark,
        size: 16,
    },
};

export const Small: Story = {
    args: {
        color: colors.gray.dark,
        size: 12,
    },
};

export const Large: Story = {
    args: {
        color: colors.gray.dark,
        size: 24,
    },
};

export const CustomColor: Story = {
    args: {
        color: colors.blue,
        size: 20,
    },
};

