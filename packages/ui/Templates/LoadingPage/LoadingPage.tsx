import type { ReactNode } from 'react';

import { Loading } from '../../Atoms';
import { Main } from '../../Organisms/Main';

export interface LoadingPageTemplateProps {
    header: ReactNode;
}

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

