import * as React from 'react';

import { Typography } from '@mui/material';
import MuiSnackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import { StyledSnackbarContent } from './Snackbar.styles';
import { SnackbarProps } from './Snackbar.types';
import { ButtonPrimary } from '../Button/styles/ButtonPrimary';

/**
 * SnackBar component to show the message to the user.
 *
 * @param SnackbarProps - The configuration properties for the rendering the Snackbar.
 * @return A React functional component rendering the animated Snackbar component.
 * @component Snackbar
 */
export const Snackbar = ({ message, state }: SnackbarProps) => {
    const [open, setOpen] = React.useState(false);
    /**
     * Handles the closing state of the Snackbar component.
     *
     * @param _event - The event that triggered the close action.
     * @param reason - The reason why the snackbar is closing (e.g., 'timeout', 'clickaway').
     */
    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        // If the user click away from the snackbar it should not be closed
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            {/* This is only for the demo purpose */}
            <ButtonPrimary variant="contained" onClick={() => setOpen(true)}>
                Open Snackbar
            </ButtonPrimary>

            <MuiSnackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <StyledSnackbarContent
                    message={
                        <Typography
                            variant="body2"
                            component="span"
                            color="color.primary.contrastText"
                        >
                            {message}
                        </Typography>
                    }
                    $state={state}
                />
            </MuiSnackbar>
        </div>
    );
};
