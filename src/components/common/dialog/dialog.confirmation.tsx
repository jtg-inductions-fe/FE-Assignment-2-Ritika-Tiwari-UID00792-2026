import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import ConfirmationDialogProps from './dialog.types';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onClose,
    onSubmit,
    title = 'Enter Value',
    description = 'Please enter the required information below.',
}) => {
    const [inputValue, setInputValue] = useState(false);

    const handleSave = () => {
        setInputValue(true);
        onSubmit(inputValue);
        onClose();
    };

    const handleCancel = () => {
        setInputValue(false);
        onSubmit(inputValue);
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
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {description}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};
