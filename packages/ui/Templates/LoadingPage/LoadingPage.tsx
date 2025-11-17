import type { ReactNode } from 'react';

import { Loading } from '../../Atoms';
import { Main } from '../../Organisms/Main';

export interface LoadingPageTemplateProps {
    header: ReactNode;
}

/**
 * Template for loading page
 *
 * @param header - Header component to display
 * @returns Loading page template with spinner
 */
export function LoadingPageTemplate({ header }: LoadingPageTemplateProps) {
    return (
        <>
            {header}
            <Main>
                <Loading />
            </Main>
        </>
    );
}

