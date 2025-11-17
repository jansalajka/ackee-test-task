import type { ReactNode } from 'react';
import { useFela } from 'react-fela';

import { colors } from '../../constants';
import { Main } from '../../Organisms/Main';
import { pageStyles } from './NewRecipePage.styles';

export interface NewRecipePageTemplateProps {
    header: ReactNode;
    form: ReactNode;
}

/**
 * Template for new recipe page
 * Accepts form component as prop
 */
export function NewRecipePageTemplate({ header, form }: NewRecipePageTemplateProps) {
    const { css } = useFela();

    return (
        <div className={css(pageStyles)}>
            {header}
            <Main>
                {form}
            </Main>
        </div>
    );
}

