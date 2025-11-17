import { useFela } from 'react-fela';

import { StarIcon } from '../../Atoms/Icons';

import { ratingStyles } from './StarRating.styles';

export interface StarRatingProps {
    stars: number;
    totalStars?: number;
    starColor: string;
}

export function StarRating({ stars, totalStars = 5, starColor }: StarRatingProps) {
    const { css } = useFela();

    const filledStars = Math.max(0, Math.min(totalStars, stars));

    return (
        <div className={css(ratingStyles)}>
            {Array.from({ length: totalStars }, (_, index) => (
                <StarIcon key={index} filled={index < filledStars} color={starColor} />
            ))}
        </div>
    );
}

