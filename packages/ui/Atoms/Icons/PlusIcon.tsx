import type { SVGProps } from 'react';
import { useFela } from 'react-fela';

import { colors } from '../../constants';

export interface PlusIconProps extends Omit<SVGProps<SVGSVGElement>, 'fill'> {
    color?: string;
    size?: number;
}

export function PlusIcon({ color = colors.blue, size = 24, ...props }: PlusIconProps) {
    const { css } = useFela();

    const iconStyles = {
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        '& path': {
            fill: color,
            fillOpacity: 1,
            transition: 'fill 0.2s ease',
        },
    };

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 241.699 241.846"
            className={css(iconStyles)}
            aria-hidden="true"
            {...props}
        >
            <g>
                <rect height="241.846" opacity="0" width="241.699" x="0" y="0" />
                <path d="M134.033 228.662L134.033 13.0371C134.033 6.00586 128.027 0 120.85 0C113.672 0 107.812 6.00586 107.812 13.0371L107.812 228.662C107.812 235.693 113.672 241.699 120.85 241.699C128.027 241.699 134.033 235.693 134.033 228.662ZM13.0371 133.887L228.662 133.887C235.693 133.887 241.699 128.027 241.699 120.85C241.699 113.672 235.693 107.666 228.662 107.666L13.0371 107.666C6.00586 107.666 0 113.672 0 120.85C0 128.027 6.00586 133.887 13.0371 133.887Z" />
            </g>
        </svg>
    );
}

