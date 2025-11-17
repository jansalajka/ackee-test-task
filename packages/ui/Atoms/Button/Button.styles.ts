import { colors } from '../../constants';

export const buttonStyles = {
    padding: '8px 16px',
    border: `2px solid ${colors.pink}`,
    borderRadius: '12px',
    backgroundColor: colors.white,
    color: colors.pink,
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '8px',
    marginBottom: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    '&:hover': {
        backgroundColor: colors.pink,
        color: colors.white,
        '& svg': {
            '& path': {
                fill: colors.white,
            },
        },
    },
    '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
};

export const iconButtonStyles = {
    color: colors.blue,
    background: 'none',
    border: 'none',
    fontSize: '20px',
    fontWeight: 400,
    cursor: 'pointer',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    verticalAlign: 'middle',
    '& svg path': {
        transition: 'fill 0.2s ease',
    },
    '&:hover': {
        opacity: 0.8,
        '& svg path': {
            fill: colors.pink,
        },
    },
    '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
};
