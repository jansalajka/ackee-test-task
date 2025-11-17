import { colors } from '../../../constants';
import { typographyStyles } from '../../../styles';

export const ratingSectionStyles = {
    backgroundColor: colors.blue,
    padding: '32px 0',
    textAlign: 'center' as const,
};

export const ratingSectionTitleStyles = {
    ...typographyStyles.ratingSectionTitle,
    marginBottom: '16px',
};

export const ratingStarsContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
};

export const errorMessageStyles = {
    ...typographyStyles.errorMessage,
    marginTop: '16px',
};

export const starButtonStyles = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
};

export const starButtonDisabledStyles = {
    ...starButtonStyles,
    cursor: 'not-allowed',
};

