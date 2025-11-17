/**
 * Input size options
 */
export enum InputSizeEnum {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}

/**
 * Input size max-width values
 */
export const INPUT_SIZE_MAX_WIDTHS = {
    [InputSizeEnum.SMALL]: '33.333%',
    [InputSizeEnum.MEDIUM]: '50%',
    [InputSizeEnum.LARGE]: '100%',
} as const;

