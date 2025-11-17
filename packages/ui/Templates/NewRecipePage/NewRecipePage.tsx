import type { ReactNode } from 'react';
import { useFela } from 'react-fela';

import { Main } from '../../Organisms';
import { pageStyles } from './NewRecipePage.styles';

export interface NewRecipePageTemplateProps {
    header: ReactNode;
    form: ReactNode;
}

/**
 * Template for new recipe page
 * Accepts form component as prop
 *
 * @param header - Header component to display
 * @param form - Form component to display
 * @returns New recipe page template
 */
export function NewRecipePageTemplate({ header, form }: NewRecipePageTemplateProps): JSX.Element {
    const { css } = useFela();

    return (
        <div className={css(pageStyles)}>
            {header}
            <Main>{form}</Main>
        </div>
    );
}
