import { useState } from 'react';

import { Box, Button } from '@mui/material';

import { ConfirmationDialog, NullStateCard, Snackbar } from '@components';
import { ResponsiveContainer } from '@components';

export function Home() {
    // This is for the demo purpose
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleSubmit = (value: boolean) => {
        if (value) {
            setIsDialogOpen(false);
        }
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <ResponsiveContainer>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
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
                <Snackbar
                    message="You have given a wrong input"
                    state="error"
                ></Snackbar>
            </Box>
        </ResponsiveContainer>
    );
}
