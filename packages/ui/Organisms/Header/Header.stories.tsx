import type { Meta, StoryObj } from '@storybook/nextjs';
import { ArrowLeftIcon, PlusIcon } from '../../Atoms';
import { colors } from '../../constants';
import { RecipeHeaderContent } from '../Recipes';
import { Header } from './Header';

const meta = {
    title: 'UI/Organisms/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        headline: 'Recipes',
        left: <ArrowLeftIcon color={colors.blue} />,
        right: <PlusIcon color={colors.blue} />,
    },
};

const WithContentRender = (args: Parameters<typeof Header>[0]) => {
    const headerContent = <RecipeHeaderContent imageUrl="https://picsum.photos/seed/food-1/800/600" title="Recipe Title" />;

    return <Header {...args} content={headerContent} />;
};

export const WithContent: Story = {
    render: WithContentRender,
    args: {
        headline: '',
        left: <ArrowLeftIcon color={colors.white} />,
        right: <PlusIcon color={colors.white} />,
    },
    parameters: {
        layout: 'fullscreen',
    },
};

const WithBlurredBackgroundRender = (args: Parameters<typeof Header>[0]) => {
    const headerContent = <RecipeHeaderContent imageUrl="https://picsum.photos/seed/food-2/800/600" title="Recipe with Background" />;

    return <Header {...args} content={headerContent} />;
};

export const WithBlurredBackground: Story = {
    render: WithBlurredBackgroundRender,
    args: {
        headline: '',
        left: <ArrowLeftIcon color={colors.white} />,
        right: <PlusIcon color={colors.white} />,
    },
    parameters: {
        layout: 'fullscreen',
    },
};

