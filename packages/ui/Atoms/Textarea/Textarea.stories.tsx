import type { Meta, StoryObj } from '@storybook/nextjs';

import { InputSizeEnum } from '../../constants';
import { Textarea } from './Textarea';

const meta = {
    title: 'UI/Atoms/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: [InputSizeEnum.SMALL, InputSizeEnum.MEDIUM, InputSizeEnum.LARGE],
        },
    },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'textarea-1',
        label: 'Description',
    },
};

export const WithValue: Story = {
    args: {
        id: 'textarea-2',
        label: 'Description',
        value: 'This is a delicious recipe for Ackee and Saltfish, a traditional Jamaican dish.',
    },
};

export const WithError: Story = {
    args: {
        id: 'textarea-3',
        label: 'Description',
        error: 'Description is required',
    },
};

export const Small: Story = {
    args: {
        id: 'textarea-4',
        label: 'Notes',
        size: InputSizeEnum.SMALL,
    },
};

export const Medium: Story = {
    args: {
        id: 'textarea-5',
        label: 'Description',
        size: InputSizeEnum.MEDIUM,
    },
};

export const Large: Story = {
    args: {
        id: 'textarea-6',
        label: 'Preparation Steps',
        size: InputSizeEnum.LARGE,
    },
};
