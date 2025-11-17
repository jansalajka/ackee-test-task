import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFela } from 'react-fela';

import { ButtonVariantEnum } from '../../constants';

import { buttonStyles, iconButtonStyles } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ButtonVariantEnum;
    icon?: ReactNode;
}

/**
 * Button component with optional icon
 *
 * @param children - Button label/content
 * @param variant - Button variant style (default or icon-only)
 * @param icon - Optional icon to display before the label
 * @param props - Additional HTML button attributes
 * @returns Button element
 */
export function Button({ children, variant = ButtonVariantEnum.DEFAULT, icon, ...props }: ButtonProps): JSX.Element {
    const { css } = useFela();
    const styles = variant === ButtonVariantEnum.ICON ? iconButtonStyles : buttonStyles;

    return (
        <button className={css(styles)} {...props}>
            {icon}
            {children}
        </button>
    );
}

