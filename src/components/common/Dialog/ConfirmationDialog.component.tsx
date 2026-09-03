import * as React from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { ConfirmationDialogProps } from './ConfirmationDialog.types';
import { ButtonPrimary, ButtonSecondary } from '../Button/index';

/**
 * MUI transition props used to animate the the confirmation dialog from the bottom up.
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
 * A reusable modal dialog component used to intercept critical user actions.
 *
 * @param {ConfirmationDialogProps} props - The configuration properties for the rendering the dialog.
 * @return A React functional component rendering the animated confirmation modal.
 * @component Dialog
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
                        variant="button"
                        component="span"
                        color="color.primary.contrastText"
                    >
                        Cancel
                    </Typography>
                </ButtonSecondary>
                <ButtonPrimary onClick={handleConfirmation} variant="contained">
                    <Typography
                        variant="button"
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
