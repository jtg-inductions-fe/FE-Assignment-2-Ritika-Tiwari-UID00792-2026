import { useState } from 'react';

import { Box, Button,Step, StepLabel, Stepper } from '@mui/material';

// 1. Define your order statuses in order
const ORDER_STATUSES = [
    'Pending',
    'Accepted',
    'Preparing',
    'Out for Delivery',
    'Delivered',
];

export default function OrderStatusTracker() {
    // Use state to manage the current step index (0 to 4)
    const [activeStep, setActiveStep] = useState(2); // Defaults to 'Preparing'

    const handleNext = () => {
        setActiveStep((prevStep) =>
            Math.min(prevStep + 1, ORDER_STATUSES.length - 1),
        );
    };

    const handleBack = () => {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box
            sx={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: 3 }}
        >
            {/* MUI Stepper Component */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {ORDER_STATUSES.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* 3. Demo Controls (To simulate database state changes) */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 3,
                }}
            >
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                >
                    Back
                </Button>

                {activeStep === ORDER_STATUSES.length - 1 ? (
                    <Button
                        onClick={handleReset}
                        variant="contained"
                        color="secondary"
                    >
                        Reset Order
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        color="primary"
                    >
                        Next Status
                    </Button>
                )}
            </Box>
        </Box>
    );
}
