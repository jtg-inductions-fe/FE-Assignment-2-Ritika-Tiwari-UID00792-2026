import SnackbarContent from '@mui/material/SnackbarContent';
import { styled } from '@mui/material/styles';

import { StyledContentProps } from './Message.types';

// Pass the interface to the styled wrapper
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
