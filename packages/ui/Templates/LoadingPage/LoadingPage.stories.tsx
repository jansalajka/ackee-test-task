import type { Meta, StoryObj } from '@storybook/nextjs';
import { colors } from '../../constants';
import { ArrowLeftIcon, PlusIcon } from '../../Atoms';
import { Header } from '../../Organisms';
import { LoadingPageTemplate } from './LoadingPage';

const meta = {
    title: 'UI/Templates/LoadingPage',
    component: LoadingPageTemplate,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LoadingPageTemplate>;

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
    },
};

