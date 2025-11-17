import type { SVGProps } from 'react';
import { useFela } from 'react-fela';

import { colors } from '../../constants';

export interface ClockIconProps extends Omit<SVGProps<SVGSVGElement>, 'fill'> {
    color?: string;
    size?: number;
}

/**
 * Clock icon component
 *
 * @param color - Icon color (default: dark gray)
 * @param size - Icon size in pixels (default: 16)
 * @param props - Additional SVG attributes
 * @returns Clock icon element
 */
export function ClockIcon({ color = colors.gray.dark, size = 16, ...props }: ClockIconProps): JSX.Element {
    const { css } = useFela();

    const iconStyles = {
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
    };

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            className={css(iconStyles)}
            aria-hidden="true"
            {...props}
        >
            <g>
                <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
                <line x1="12" y1="12" x2="12" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </g>
        </svg>
    );
}

