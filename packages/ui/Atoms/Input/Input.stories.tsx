import type { Meta, StoryObj } from '@storybook/nextjs';

import { InputSizeEnum } from '../../constants';
import { Input } from './Input';

const meta = {
    title: 'UI/Atoms/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: [InputSizeEnum.SMALL, InputSizeEnum.MEDIUM, InputSizeEnum.LARGE],
        },
        type: {
            control: 'select',
            options: ['text', 'number', 'email', 'password'],
        },
    },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
    args: {
        id: 'input-1',
        label: 'Recipe Name',
        type: 'text',
    },
};

export const WithPlaceholder: Story = {
    args: {
        id: 'input-2',
        placeholder: 'Enter recipe name',
        type: 'text',
    },
};

export const WithValue: Story = {
    args: {
        id: 'input-3',
        label: 'Recipe Name',
        value: 'Ackee and Saltfish',
        type: 'text',
    },
};

export const WithError: Story = {
    args: {
        id: 'input-4',
        label: 'Recipe Name',
        error: 'Recipe name must contain "Ackee"',
        type: 'text',
    },
};

export const Small: Story = {
    args: {
        id: 'input-5',
        label: 'Time',
        type: 'number',
        size: InputSizeEnum.SMALL,
    },
};

export const Medium: Story = {
    args: {
        id: 'input-6',
        label: 'Recipe Name',
        type: 'text',
        size: InputSizeEnum.MEDIUM,
    },
};

export const Large: Story = {
    args: {
        id: 'input-7',
        label: 'Recipe Name',
        type: 'text',
        size: InputSizeEnum.LARGE,
    },
};
