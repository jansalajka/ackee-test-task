import { useFela } from 'react-fela';

import { StarIcon } from '../../Atoms/Icons';

import { ratingStyles } from './StarRating.styles';

export interface StarRatingProps {
    stars: number;
    totalStars?: number;
    starColor: string;
}

/**
 * Star rating component that displays filled and empty stars
 *
 * @param stars - Number of filled stars to display (clamped between 0 and totalStars)
 * @param totalStars - Total number of stars to display (default: 5)
 * @param starColor - Color for the stars
 * @returns Star rating element
 */
export function StarRating({ stars, totalStars = 5, starColor }: StarRatingProps): JSX.Element {
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

