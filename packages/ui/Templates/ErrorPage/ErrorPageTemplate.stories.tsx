import type { Meta, StoryObj } from '@storybook/nextjs';
import { colors } from '../../constants';
import { ArrowLeftIcon, PlusIcon } from '../../Atoms';
import { Header } from '../../Organisms';
import { ErrorPageTemplate } from './ErrorPageTemplate';

const meta = {
    title: 'UI/Templates/ErrorPage',
    component: ErrorPageTemplate,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ErrorPageTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultHeader = (
    <Header
        headline=""
        left={<ArrowLeftIcon color={colors.blue} />}
        right={<PlusIcon color={colors.blue} />}
    />
);

export const Default: Story = {
    args: {
        header: defaultHeader,
        title: 'Error Loading Recipe',
        message: 'An error occurred while loading the recipe. Please try again later.',
    },
};

export const NotFound: Story = {
    args: {
        header: defaultHeader,
        title: 'Recipe Not Found',
        message: 'The recipe you are looking for does not exist.',
    },
};

export const NetworkError: Story = {
    args: {
        header: defaultHeader,
        title: 'Network Error',
        message: 'Unable to connect to the server. Please check your internet connection.',
    },
};

