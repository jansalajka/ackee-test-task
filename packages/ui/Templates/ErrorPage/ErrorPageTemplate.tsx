import type { ReactNode } from 'react';
import { useFela } from 'react-fela';

import { Main } from '../../Organisms/Main';
import { typographyStyles } from '../../styles';
import { errorContainerStyles, errorTitleStyles } from './ErrorPageTemplate.styles';

export interface ErrorPageProps {
    header: ReactNode;
    title: string;
    message: string;
}

/**
 * Template for error page
 *
 * @param header - Header component to display
 * @param title - Error title/heading
 * @param message - Error message text
 * @returns Error page template
 */
export function ErrorPageTemplate({ header, title, message }: ErrorPageProps): JSX.Element {
    const { css } = useFela();

    return (
        <>
            {header}
            <Main>
                <div className={css(errorContainerStyles)}>
                    <h2 className={css(errorTitleStyles)}>{title}</h2>
                    <p className={css(typographyStyles.bodyText)}>{message}</p>
                </div>
            </Main>
        </>
    );
}

