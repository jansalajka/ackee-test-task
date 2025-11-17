import { typographyStyles } from '../../styles';
import { desktop } from '../../utils';

const HORIZONTAL_PADDING = {
    mobile: '18px',
    desktop: '36px',
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


