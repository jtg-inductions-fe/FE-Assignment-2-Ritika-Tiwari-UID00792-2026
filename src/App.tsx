import { useState } from 'react';

import { Button } from '@mui/material';

import { EmptyStateCard } from './components/common/card/card.emptyState';
import { ConfirmationDialog } from './components/common/dialog/dialog.confirmation';
import { AutohideSnackbar } from './components/common/error/error.message';

export default function App() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = (value: boolean) => {
        if (value) {
            setIsDialogOpen(false);
        }
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleClick = () => {
        if (!open) {
            setOpen(true);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Button onClick={() => setIsDialogOpen(true)}>
                Open Confirmation Dialog
            </Button>

            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description="Are you sure you want to logout?"
            />
            <EmptyStateCard
                title="No Data Available"
                description="There is nothing to display here at the moment. Try adding a new item or adjusting your filters."
            />
            <Button onClick={handleClick}></Button>
            <AutohideSnackbar errorMessage="You have given a wrong input"></AutohideSnackbar>
        </div>
    );
}
