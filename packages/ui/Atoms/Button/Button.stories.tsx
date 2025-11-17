import type { Meta, StoryObj } from '@storybook/nextjs';
import { ButtonVariantEnum } from '../../constants';
import { colors } from '../../constants';
import { PlusIcon } from '../Icons';
import { Button } from './Button';

const meta = {
    title: 'UI/Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [ButtonVariantEnum.DEFAULT, ButtonVariantEnum.ICON],
        },
        disabled: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Button',
    },
};

export const WithIcon: Story = {
    args: {
        children: 'Add',
        icon: <PlusIcon color={colors.pink} size={16} />,
    },
};

export const IconOnly: Story = {
    args: {
        variant: ButtonVariantEnum.ICON,
        icon: <PlusIcon color={colors.blue} />,
        'aria-label': 'Add',
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Button',
        disabled: true,
    },
};

