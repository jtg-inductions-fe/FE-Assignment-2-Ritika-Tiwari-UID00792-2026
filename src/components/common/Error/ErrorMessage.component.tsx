import * as React from 'react';

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import {
    ErrorSnackbarContent,
    StyledButton,
} from './ErrorMessage.component.styled';
import { ErrorMessageProps } from './ErrorMessage.types';

export const AutohideSnackbar: React.FC<ErrorMessageProps> = ({
    errorMessage,
}) => {
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
            <StyledButton variant="contained" onClick={() => setOpen(true)}>
                Open Snackbar
            </StyledButton>

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <ErrorSnackbarContent message={errorMessage} />
            </Snackbar>
        </div>
    );
};
