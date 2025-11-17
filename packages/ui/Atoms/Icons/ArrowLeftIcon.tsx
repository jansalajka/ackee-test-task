import type { SVGProps } from 'react';
import { useFela } from 'react-fela';

import { colors } from '../../constants';

export interface ArrowLeftIconProps extends Omit<SVGProps<SVGSVGElement>, 'fill'> {
    color?: string;
}

const iconStyles = {
    display: 'inline-block',
    width: '24px',
    height: '24px',
};

/**
 * Arrow left icon component
 *
 * @param color - Icon color (default: blue)
 * @param props - Additional SVG attributes
 * @returns Arrow left icon element
 */
export function ArrowLeftIcon({ color = colors.blue, ...props }: ArrowLeftIconProps): JSX.Element {
    const { css } = useFela();

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 272.021 222.217"
            className={css(iconStyles)}
            aria-hidden="true"
            {...props}
        >
            <g>
                <rect height="222.217" opacity="0" width="272.021" x="0" y="0" />
                <path
                    d="M111.328 222.07C118.506 222.07 124.219 216.797 124.219 209.473C124.219 205.957 122.9 202.441 120.557 200.244L87.7441 166.846L26.6602 111.035L87.7441 55.2246L120.557 21.8262C122.9 19.4824 124.219 16.1133 124.219 12.5977C124.219 5.27344 118.506 0 111.328 0C107.812 0 104.736 1.17188 101.514 4.39453L4.54102 101.221C1.61133 104.004 0 107.373 0 111.035C0 114.697 1.61133 118.066 4.54102 120.85L101.807 217.969C104.736 220.752 107.812 222.07 111.328 222.07ZM73.8281 124.072L259.131 124.072C266.748 124.072 272.021 118.652 272.021 111.035C272.021 103.418 266.748 97.998 259.131 97.998L73.8281 97.998L26.6602 100.928C20.6543 100.928 16.5527 105.029 16.5527 111.035C16.5527 117.041 20.6543 121.143 26.6602 121.143Z"
                    fill={color}
                    fillOpacity={1}
                />
            </g>
        </svg>
    );
}

