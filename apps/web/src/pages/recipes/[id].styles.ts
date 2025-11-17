import { colors } from '@workspace/ui';
import { desktop } from '~utils/breakpoints';
import { typographyStyles } from '~modules/fela/styles/typography';

/**
 * Horizontal padding constant
 * 18px on mobile, 36px on desktop
 */
export const HORIZONTAL_PADDING = {
    mobile: '18px',
    desktop: '36px',
};

export const pageStyles = {
    backgroundColor: colors.background,
    minHeight: '100vh',
};

export const headerSectionStyles = {
    backgroundColor: colors.purple.light,
    position: 'relative',
    overflow: 'hidden',
};

export const getBlurredBackgroundStyles = (imageUrl: string) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(10px)',
    transform: 'scale(1.1)',
    zIndex: 0,
    opacity: 0.3,
});

export const getHeaderContentContainerStyles = (imageUrl: string) => ({
    maxWidth: '1024px',
    margin: '0 auto',
    width: '100%',
    backgroundImage: `linear-gradient(to bottom, rgba(255, 0, 255, 0.0), rgba(255, 0, 255, 0.3)), url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex: 2,
});

export const headerBottomStyles = {
    padding: `32px ${HORIZONTAL_PADDING.mobile}`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    minHeight: '250px',
    ...desktop({
        padding: `32px ${HORIZONTAL_PADDING.desktop}`,
    }),
};

export const recipeTitleStyles = {
    ...typographyStyles.recipeTitle,
    textAlign: 'left',
    position: 'relative',
    zIndex: 2,
};

export const ratingBarStyles = {
    backgroundColor: colors.pink,
    padding: '16px 0',
};

export const ratingBarContainerStyles = {
    maxWidth: '1024px',
    margin: '0 auto',
    width: '100%',
    padding: `0 ${HORIZONTAL_PADDING.mobile}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    ...desktop({
        padding: `0 ${HORIZONTAL_PADDING.desktop}`,
    }),
};

export const ratingLeftStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
};

export const ratingRightStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ...typographyStyles.ratingTime,
};

export const contentStyles = {
    backgroundColor: colors.white,
    padding: HORIZONTAL_PADDING.mobile,
    ...desktop({
        padding: HORIZONTAL_PADDING.desktop,
    }),
};

export const introTextStyles = {
    ...typographyStyles.introText,
    marginBottom: '32px',
};

export const sectionHeadingStyles = {
    ...typographyStyles.sectionHeading,
    marginBottom: '16px',
};

export const ingredientsListStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginLeft: '16px',
    marginBottom: '32px',
};

export const ingredientItemStyles = {
    ...typographyStyles.bodyText,
    marginBottom: '8px',
    paddingLeft: '24px',
    position: 'relative',
    '&::before': {
        content: '"•"',
        position: 'absolute',
        left: 0,
        color: colors.gray.dark,
    },
};

export const preparationTextStyles = {
    ...typographyStyles.bodyText,
    marginBottom: '32px',
};

export const ratingSectionStyles = {
    backgroundColor: colors.blue,
    padding: '32px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
};

export const ratingSectionTitleStyles = {
    ...typographyStyles.ratingSectionTitle,
};

export const ratingStarsContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};

export const errorContainerStyles = {
    padding: HORIZONTAL_PADDING.mobile,
    textAlign: 'center',
    ...desktop({
        padding: HORIZONTAL_PADDING.desktop,
    }),
};

export const errorTitleStyles = {
    ...typographyStyles.errorTitle,
    margin: '0 0 16px 0',
};


