import type { ReactNode } from 'react';
import { useFela } from 'react-fela';
import { HeaderHoverColorEnum } from '../../constants';
import {
    blurredBackgroundOverlayStyles,
    blurredBackgroundStyles,
    contentContainerStyles,
    getSectionStyles,
    headerButtonsContainerStyles,
    headerContainerRelativeStyles,
    headerContainerStyles,
    headerStyles,
    headerWithBlurredBackgroundStyles,
    headerWithContentStyles,
    headlineStyles,
} from './Header.styles';

export interface HeaderProps {
    headline: string;
    left?: ReactNode;
    right?: ReactNode;
    content?: ReactNode;
    blurredBackgroundImage?: string;
    hoverColor?: HeaderHoverColorEnum;
}

/**
 * Header component with optional blurred background and content section
 *
 * @param headline - Main headline text (hidden when content is provided)
 * @param left - Optional left section content (buttons, links, etc.)
 * @param right - Optional right section content (buttons, links, etc.)
 * @param content - Optional content section below header buttons
 * @param blurredBackgroundImage - Optional background image URL for blurred effect
 * @param hoverColor - Color for hover effects on left/right sections (default: pink)
 * @returns Header element
 */
export function Header({ headline, left, right, content, blurredBackgroundImage, hoverColor = HeaderHoverColorEnum.PINK }: HeaderProps) {
    const { css } = useFela();
    const hasContent = Boolean(content);
    const hasBlurredBackground = Boolean(blurredBackgroundImage);
    const headerStyle = getHeaderStyles(hasContent, hasBlurredBackground);
    const leftSectionStyle = getSectionStyles(hoverColor, true);
    const rightSectionStyle = getSectionStyles(hoverColor, false);

    return (
        <header className={css(headerStyle)}>
            {hasBlurredBackground && (
                <>
                    <div
                        className={css(blurredBackgroundStyles)}
                        style={{
                            backgroundImage: `url(${blurredBackgroundImage})`,
                        }}
                    />
                    <div className={css(blurredBackgroundOverlayStyles)} />
                </>
            )}
            <div
                className={css([
                    headerContainerStyles,
                    ...(hasContent ? [headerButtonsContainerStyles] : []),
                    ...(hasBlurredBackground ? [headerContainerRelativeStyles] : []),
                ])}
            >
                <div className={css(leftSectionStyle)}>{left}</div>
                {!hasContent && <h1 className={css(headlineStyles)}>{headline}</h1>}
                <div className={css(rightSectionStyle)}>{right}</div>
            </div>
            {content && <div className={css(contentContainerStyles)}>{content}</div>}
        </header>
    );
}

/**
 * Gets the appropriate header styles based on content and background
 *
 * @param hasContent - Whether the header has a content section
 * @param hasBlurredBackground - Whether the header has a blurred background image
 * @returns Header style object
 */
function getHeaderStyles(hasContent: boolean, hasBlurredBackground: boolean) {
    if (hasContent) {
        return headerWithContentStyles;
    }

    if (hasBlurredBackground) {
        return headerWithBlurredBackgroundStyles;
    }

    return headerStyles;
}