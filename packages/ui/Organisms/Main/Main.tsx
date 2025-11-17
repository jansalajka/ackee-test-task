import type { ReactNode } from 'react';
import { useFela } from 'react-fela';

import { mainStyles } from './Main.styles';

export interface MainProps {
    children: ReactNode;
}

export function Main({ children }: MainProps) {
    const { css } = useFela();

    return <main className={css(mainStyles)}>{children}</main>;
}

