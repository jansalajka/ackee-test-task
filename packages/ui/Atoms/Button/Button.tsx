import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFela } from 'react-fela';

import { ButtonVariantEnum } from '../../constants';

import { buttonStyles, iconButtonStyles } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ButtonVariantEnum;
    icon?: ReactNode;
}

export function Button({ children, variant = ButtonVariantEnum.DEFAULT, icon, ...props }: ButtonProps) {
    const { css } = useFela();
    const styles = variant === ButtonVariantEnum.ICON ? iconButtonStyles : buttonStyles;

    return (
        <button className={css(styles)} {...props}>
            {icon}
            {children}
        </button>
    );
}

