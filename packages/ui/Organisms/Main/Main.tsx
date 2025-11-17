import type { ReactNode } from 'react';
import { useFela } from 'react-fela';

import { mainStyles } from './Main.styles';

export interface MainProps {
    children: ReactNode;
}

/**
 * Main content container component
 *
 * @param children - Main content to display
 * @returns Main element
 */
export function Main({ children }: MainProps): JSX.Element {
    const { css } = useFela();

    return <main className={css(mainStyles)}>{children}</main>;
}
