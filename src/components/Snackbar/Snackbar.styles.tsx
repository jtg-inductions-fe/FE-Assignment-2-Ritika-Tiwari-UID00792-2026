import { SnackbarContent, styled } from '@mui/material';

import { StyledContentProps } from './Snackbar.types';

/**
 *  Styled component used to style the content of the snackbar.
 * @param {StyledContentProps} props - The styled component configuration props.
 * @param {string} props.$state - the alert status type. Expected values: 'success', 'warning', 'error'.
 */
export const StyledSnackbarContent = styled(
    SnackbarContent,
)<StyledContentProps>(({ theme, snackbarState }) => ({
    // Dynamically set the color based on the prop
    backgroundColor: (() => {
        if (snackbarState === 'success') return theme.palette.success.main;
        if (snackbarState === 'warning') return theme.palette.warning.main;
        return theme.palette.error.main;
    })(),
    color: theme.palette.primary.contrastText,
}));
