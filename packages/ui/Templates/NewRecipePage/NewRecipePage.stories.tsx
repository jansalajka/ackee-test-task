import type { Meta, StoryObj } from '@storybook/nextjs';

import { colors } from '../../constants';
import { ArrowLeftIcon, PlusIcon } from '../../Atoms';
import { Button } from '../../Atoms';
import { Header, NewRecipeForm } from '../../Organisms';
import { ButtonVariantEnum } from '../../../../apps/web/src/constants/buttonVariants';
import { realTranslate } from '../../../../apps/web/.storybook/utils';
import { NewRecipePageTemplate } from './NewRecipePage';

const meta = {
    title: 'UI/Templates/NewRecipePage',
    component: NewRecipePageTemplate,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NewRecipePageTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

function createDefaultHeader() {
    return (
        <Header
            headline={realTranslate('TRANS_ADD_RECIPE')}
            left={<ArrowLeftIcon color={colors.blue} />}
            right={
                <Button
                    type="submit"
                    form="recipe-form"
                    variant={ButtonVariantEnum.ICON}
                    icon={<PlusIcon color={colors.blue} />}
                    aria-label={realTranslate('TRANS_SUBMIT_RECIPE')}
                />
            }
        />
    );
}

export const Default: Story = {
    render: () => (
        <NewRecipePageTemplate
            header={createDefaultHeader()}
            form={
                <NewRecipeForm
                    dependencies={{
                        translate: realTranslate,
                        onSubmit: async () => {},
                        isPending: false,
                        error: null,
                    }}
                />
            }
        />
    ),
};

export const WithError: Story = {
    render: () => (
        <NewRecipePageTemplate
            header={createDefaultHeader()}
            form={
                <NewRecipeForm
                    dependencies={{
                        translate: realTranslate,
                        onSubmit: async () => {},
                        isPending: false,
                        error: new Error('Failed to create recipe'),
                    }}
                />
            }
        />
    ),
};

export const Pending: Story = {
    render: () => (
        <NewRecipePageTemplate
            header={createDefaultHeader()}
            form={
                <NewRecipeForm
                    dependencies={{
                        translate: realTranslate,
                        onSubmit: async () => {},
                        isPending: true,
                        error: null,
                    }}
                />
            }
        />
    ),
};

