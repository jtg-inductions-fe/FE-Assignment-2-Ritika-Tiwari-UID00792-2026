import * as React from 'react';

import { Typography } from '@mui/material';
import MuiSnackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import { StyledSnackbarContent } from './Message.styles';
import { MessageProps } from './Message.types';
import { ButtonPrimary } from '../Button';
export const Snackbar = ({ message, state }: MessageProps) => {
    const [open, setOpen] = React.useState(false);

    /**
     * Handle Closing state of the AutohideSnackbar Component
     */
    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
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
