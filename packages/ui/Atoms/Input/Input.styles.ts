import { colors, INPUT_SIZE_MAX_WIDTHS, InputSizeEnum } from '../../constants';

export const getContainerStyles = (size?: InputSizeEnum) => ({
    position: 'relative',
    marginBottom: '16px',
    maxWidth: size ? INPUT_SIZE_MAX_WIDTHS[size] : '100%',
});

export const inputWrapperStyles = {
    position: 'relative',
    paddingTop: '24px',
};

export const inputWrapperPlaceholderStyles = {
    position: 'relative',
    paddingTop: 0,
};

export const inputStyles = {
    width: '100%',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: `1px solid ${colors.gray.light}`,
    padding: '0 0 9px 0',
    fontSize: '16px',
    color: colors.gray.dark,
    backgroundColor: 'transparent',
    outline: 'none',
    '&::placeholder': {
        color: colors.gray.medium,
    },
    '&:focus': {
        borderBottomColor: colors.blue,
        borderBottomWidth: '2px',
        paddingBottom: '8px',
    },
};

export const labelStyles = {
    position: 'absolute',
    left: 0,
    top: '24px',
    fontSize: '16px',
    color: colors.gray.medium,
    pointerEvents: 'none',
    transition: 'all 0.2s ease',
    transformOrigin: 'left top',
};

export const labelFocusedStyles = {
    top: '0',
    fontSize: '14px',
    color: colors.blue,
};

export const errorStyles = {
    color: colors.pink,
    fontSize: '14px',
    marginTop: '4px',
};
