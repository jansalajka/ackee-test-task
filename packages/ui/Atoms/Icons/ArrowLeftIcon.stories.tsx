import type { Meta, StoryObj } from '@storybook/nextjs';

import { colors } from '../../constants';
import { ArrowLeftIcon } from './ArrowLeftIcon';

const meta = {
    title: 'UI/Atoms/Icons/ArrowLeftIcon',
    component: ArrowLeftIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'color',
        },
    },
} satisfies Meta<typeof ArrowLeftIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        color: colors.blue,
    },
};

export const CustomColor: Story = {
    args: {
        color: colors.pink,
    },
};
