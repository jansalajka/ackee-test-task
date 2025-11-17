import { colors } from '../../../constants';
import { typographyStyles } from '../../../styles';
import { colorUtils } from '../../../utils';

export const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    borderBottom: `1px solid ${colors.gray.light}`,
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
        backgroundColor: colorUtils.hoverBackground,
    },
};

export const imageStyles = {
    width: '96px',
    height: '96px',
    borderRadius: '8px',
    flexShrink: 0,
    objectFit: 'cover',
};

export const contentStyles = {
    flex: 1,
    minWidth: 0,
};

export const nameStyles = {
    ...typographyStyles.recipeItemName,
    marginBottom: '8px',
    wordBreak: 'break-word',
};

export const ratingContainerStyles = {
    marginBottom: '4px',
};

export const timeStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    ...typographyStyles.recipeItemTime,
};
