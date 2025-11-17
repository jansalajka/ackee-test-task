import { colors } from '@workspace/ui';

export const pageStyles = {
    backgroundColor: colors.background,
    minHeight: '100vh',
};

export const backLinkStyles = {
    color: colors.blue,
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 400,
    display: 'inline-block',
    '&:hover': {
        opacity: 0.8,
    },
};
