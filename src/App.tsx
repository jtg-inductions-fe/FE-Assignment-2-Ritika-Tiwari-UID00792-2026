import { useState } from 'react';

import { Box, Button } from '@mui/material';

import { ConfirmationDialog, NullStateCard, Snackbar } from '@components';
import { ResponsiveContainer } from '@components';

export function App() {
    // This is for the demo purpose
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
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
                {/* This is only for the demo purpose */}
                <Button
                    variant="contained"
                    onClick={() => setIsSnackbarOpen(true)}
                >
                    Open Snackbar
                </Button>
                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={2000}
                    onClose={() => setIsSnackbarOpen(false)}
                    message="You have given a wrong input"
                    state="error"
                ></Snackbar>
            </Box>
        </ResponsiveContainer>
    );
}
