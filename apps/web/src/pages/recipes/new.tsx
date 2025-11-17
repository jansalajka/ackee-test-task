import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { useRouter } from 'next/router';
import { useCreateRecipe } from '@workspace/api';
import { colors } from '@workspace/ui';
import { routes } from '~constants';
import { ButtonVariantEnum } from '~constants/buttonVariants';
import { useTrans } from '~modules/trans';
import { ArrowLeftIcon, Button, Header, NewRecipeForm, NewRecipePageTemplate, PlusIcon } from '@workspace/ui';
import { backLinkStyles } from './new.styles';

const NewRecipePage: NextPage = () => {
    const { css } = useFela();
    const trans = useTrans();
    const router = useRouter();
    const createRecipe = useCreateRecipe();
    const [isFormPending, setIsFormPending] = useState<boolean>(false);

    const handleSubmit = async (data: Parameters<typeof createRecipe.mutateAsync>[0]) => {
        const result = await createRecipe.mutateAsync(data);

        if (!result?.id) {
            router.push(routes.home);

            return;
        }

        router.push(`/recipes/${result.id}`);
    };

    const header = (
        <Header
            headline={trans.translate('TRANS_ADD_RECIPE')}
            left={
                <Link href={routes.home} className={css(backLinkStyles)} aria-label={trans.translate('TRANS_NAVIGATE_BACK')}>
                    <ArrowLeftIcon color={colors.blue} />
                </Link>
            }
            right={
                <Button
                    type="submit"
                    form="recipe-form"
                    disabled={isFormPending}
                    variant={ButtonVariantEnum.ICON}
                    icon={<PlusIcon color={colors.blue} />}
                    aria-label={trans.translate('TRANS_SUBMIT_RECIPE')}
                />
            }
        />
    );

    return (
        <NewRecipePageTemplate
            header={header}
            form={
                <NewRecipeForm
                    dependencies={{
                        translate: trans.translate.bind(trans) as (key: string) => string,
                        onSubmit: handleSubmit,
                        isPending: createRecipe.isPending,
                        error: createRecipe.error,
                    }}
                    onPendingChange={setIsFormPending}
                />
            }
        />
    );
};

export default NewRecipePage;
