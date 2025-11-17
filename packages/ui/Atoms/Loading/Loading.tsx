import Image from 'next/image';
import { useFela } from 'react-fela';

import { containerStyles } from './Loading.styles';

export interface LoadingProps {
    width?: number;
    height?: number;
}

export function Loading({ width = 48, height = 48 }: LoadingProps) {
    const { css } = useFela();

    return (
        <div className={css(containerStyles)}>
            <Image
                src="/icons/loading.svg"
                alt="Loading"
                width={width}
                height={height}
                priority
            />
        </div>
    );
}

