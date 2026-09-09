import { Alert, Typography } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';

import { SnackbarProps } from './Snackbar.types';

/**
 * SnackBar component to show the message to the user.
 *
 * @param SnackbarProps - The configuration properties for the rendering the Snackbar.
 * @return A React functional component rendering the animated Snackbar component.
 */
export const Snackbar = ({
    open,
    autoHideDuration,
    onClose,
    message,
    state,
}: SnackbarProps) => (
    <div>
        <MuiSnackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={state} variant="filled">
                <Typography
                    variant="body2"
                    component="span"
                    color="color.primary.contrastText"
                >
                    {message}
                </Typography>
            </Alert>
        </MuiSnackbar>
    </div>
);
