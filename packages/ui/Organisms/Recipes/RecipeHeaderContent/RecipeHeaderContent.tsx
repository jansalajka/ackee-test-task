import { useFela } from 'react-fela';

import { colors } from '../../../constants';
import { desktop } from '../../../utils';

export interface RecipeHeaderContentProps {
    imageUrl: string;
    title: string;
}

/**
 * Header content component for recipe detail pages with blurred background image
 *
 * @param imageUrl - URL for the recipe background image
 * @param title - Recipe title to display
 * @returns Recipe header content element with blurred background
 */
export function RecipeHeaderContent({ imageUrl, title }: RecipeHeaderContentProps): JSX.Element {
    const { css } = useFela();

    const headerSectionStyles = {
        backgroundColor: colors.purple.light,
        position: 'relative',
        overflow: 'hidden',
    };

    const getBlurredBackgroundStyles = (url: string) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(10px)',
        transform: 'scale(1.1)',
        zIndex: 0,
        opacity: 0.3,
    });

    const getHeaderContentContainerStyles = (url: string) => ({
        maxWidth: '1024px',
        margin: '0 auto',
        width: '100%',
        backgroundImage: `linear-gradient(to bottom, rgba(255, 0, 255, 0.0), rgba(255, 0, 255, 0.3)), url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        zIndex: 2,
    });

    const headerBottomStyles = {
        padding: '32px 18px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        minHeight: '250px',
        ...desktop({
            padding: '32px 36px',
        }),
    };

    const recipeTitleStyles = {
        color: colors.white,
        fontSize: '32px',
        fontWeight: 700,
        textAlign: 'left',
        margin: 0,
        lineHeight: 1.4,
        position: 'relative',
        zIndex: 2,
    };

    return (
        <div className={css(headerSectionStyles)}>
            <div className={css(getBlurredBackgroundStyles(imageUrl))} aria-hidden='true' />
            <div className={css(getHeaderContentContainerStyles(imageUrl))}>
                <div className={css(headerBottomStyles)}>
                    <h1 className={css(recipeTitleStyles)}>{title}</h1>
                </div>
            </div>
        </div>
    );
}
