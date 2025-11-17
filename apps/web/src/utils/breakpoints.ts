/**
 * Breakpoint values for responsive design
 */
export const breakpoints = {
    mobile: 0,
    desktop: 768,
} as const;

/**
 * Creates a media query style object for desktop breakpoint
 *
 * @param styles - Styles to apply on desktop
 * @returns Media query style object
 */
export function desktop(styles: Record<string, unknown>): Record<string, unknown> {
    return {
        [`@media (min-width: ${breakpoints.desktop}px)`]: styles,
    };
}

