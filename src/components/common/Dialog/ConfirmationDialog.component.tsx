import * as React from 'react';

import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { ConfirmationDialogProps } from './ConfirmationDialog.types';
import { ButtonPrimary, ButtonSecondary } from '../Button';

/**
 * MUI transition props used for the confirmation dialog
 */
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * MUI component for the confirmation dialog used in the website
 */
export const ConfirmationDialog = ({
    open,
    onClose,
    onSubmit,
    title = 'Enter Value',
    description = 'Please enter the required information below.',
}: ConfirmationDialogProps) => {
    /**
     * Handle confirm event of the Confirmation Dialog Component
     */
    const handleConfirmation = () => {
        onSubmit(true);
        onClose();
    };

    /**
     * Handle Cancel state of the Confirmation Dialog Component
     */
    const handleCancel = () => {
        onSubmit(false);
        onClose();
    };

    return (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={handleCancel}
            aria-describedby="alert-dialog-slide-description"
            role="alertdialog"
        >
            <DialogTitle variant="h6" color="text.primary" gutterBottom>
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    variant="body2"
                    color="text.secodary"
                    gutterBottom
                >
                    {description}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <ButtonSecondary onClick={handleCancel}>
                    <Typography
                        variant="body2"
                        component="span"
                        color="color.primary.contrastText"
                    >
                        Cancel
                    </Typography>
                </ButtonSecondary>
                <ButtonPrimary onClick={handleConfirmation} variant="contained">
                    <Typography
                        variant="body2"
                        component="span"
                        color="color.primary.contrastText"
                    >
                        Yes
                    </Typography>
                </ButtonPrimary>
            </DialogActions>
        </Dialog>
    );
};
