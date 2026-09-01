import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import { NullStateCard } from '../components/common/Card/NullState.component';
import { ConfirmationDialog } from '../components/common/Dialog/ConfirmationDialog.component';
import { AutohideSnackbar } from '../components/common/Error/ErrorMessage.component';
import { ResponsiveContainer } from '../components/layouts/Container/ResponsiveContainer.component';

export function Home() {
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
        <ResponsiveContainer>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
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
                <NullStateCard
                    title="No Data Available"
                    description="There is nothing to display here at the moment. Try adding a new item or adjusting your filters."
                />
                <Link to="/Cart" style={{ marginRight: '10px' }}>
                    Cart
                </Link>
                <Button onClick={handleClick}></Button>
                <AutohideSnackbar errorMessage="You have given a wrong input"></AutohideSnackbar>
            </div>
        </ResponsiveContainer>
    );
}
