import { SnackbarContent, styled } from '@mui/material';

import { StyledContentProps } from './Message.types';

/**
 *  Styled component used to style the content of the snackbar.
 * @param {StyledContentProps} props - The styled component configuration props.
 * @param {string} props.$state - the alert status type. Expected values: 'success', 'warning', 'error'.
 */
export const StyledSnackbarContent = styled(
    SnackbarContent,
)<StyledContentProps>(({ theme, $state }) => ({
    // Dynamically set the color based on the prop
    backgroundColor:
        $state === 'success'
            ? theme.palette.success.main
            : $state === 'warning'
              ? theme.palette.warning.main
              : theme.palette.error.main,
    color: theme.palette.primary.contrastText,
}));
