import { colors, HeaderHoverColorEnum } from '../../constants';
import { typographyStyles } from '../../styles';
import { colorUtils, desktop } from '../../utils';

export const headerStyles = {
    borderBottom: `1px solid ${colors.gray.light}`,
    backgroundColor: colors.white,
    boxShadow: `0 1px 3px ${colorUtils.shadow}`,
    padding: '24px 0',
    boxSizing: 'border-box',
    position: 'relative',
};

export const headerWithBlurredBackgroundStyles = {
    borderBottom: `1px solid ${colors.gray.light}`,
    backgroundColor: colors.white,
    padding: '24px 0',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
};

export const blurredBackgroundStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(100px)',
    transform: 'scale(1)',
    zIndex: 0,
};

export const blurredBackgroundOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorUtils.overlay,
    zIndex: 1,
};

export const headerWithContentStyles = {
    borderBottom: 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    padding: 0,
    boxSizing: 'border-box',
    position: 'relative',
};

export const headerContainerStyles = {
    maxWidth: '1024px',
    margin: '0 auto',
    width: '100%',
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box' as const,
    ...desktop({
        padding: '0 36px',
    }),
};

export const headerContainerRelativeStyles = {
    position: 'relative',
    zIndex: 2,
};

export const headerButtonsContainerStyles = {
    paddingTop: '24px',
    paddingBottom: '0',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    ...desktop({
        paddingTop: '24px',
    }),
};

const buttonLinkStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    lineHeight: 1,
    verticalAlign: 'middle',
    '& svg path': {
        transition: 'fill 0.2s ease',
    },
    '&:hover': {
        opacity: 0.7,
        '& svg path': {
            fill: colors.pink,
        },
    },
};

const buttonLinkStylesBlueHover = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    lineHeight: 1,
    verticalAlign: 'middle',
    '& svg path': {
        transition: 'fill 0.2s ease',
    },
    '&:hover': {
        opacity: 0.7,
        '& svg path': {
            fill: colors.blue,
        },
    },
};

export const getSectionStyles = (hoverColor: HeaderHoverColorEnum, isLeft: boolean) => ({
    flex: '0 0 auto',
    width: '80px',
    display: 'flex',
    justifyContent: isLeft ? 'flex-start' : 'flex-end',
    alignItems: 'center',
    '& a': hoverColor === HeaderHoverColorEnum.BLUE ? buttonLinkStylesBlueHover : buttonLinkStyles,
    '& button': hoverColor === HeaderHoverColorEnum.BLUE ? buttonLinkStylesBlueHover : buttonLinkStyles,
});

export const headlineStyles = {
    flex: '1 1 auto',
    textAlign: 'center',
    ...typographyStyles.headerHeadline,
};

export const contentContainerStyles = {
    position: 'relative' as const,
    zIndex: 1,
};

