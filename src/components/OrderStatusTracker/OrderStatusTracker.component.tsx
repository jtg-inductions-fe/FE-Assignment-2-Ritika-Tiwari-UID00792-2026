import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';

import { OrderStatusTrackerProps } from './OrderStatusTracker.types';

// Assuming this array is defined outside your component
const ORDER_STATUSES = [
    'Pending',
    'Confirmed',
    'Preparing',
    'Shipped',
    'Delivered',
];

export default function OrderStatusTracker({
    userRole,
    status,
    onStatusChange,
}: OrderStatusTrackerProps) {
    // Derive the active index from the incoming status prop
    const activeStep = ORDER_STATUSES.indexOf(status);

    // Fallback to 0 if the status string doesn't match any index perfectly
    const currentStep = activeStep === -1 ? 0 : activeStep;

    // Determine if the current user has permission to change states
    const isOwner = userRole === 'owner';

    const handleNext = () => {
        if (onStatusChange && currentStep < ORDER_STATUSES.length - 1) {
            onStatusChange(ORDER_STATUSES[currentStep + 1]);
        }
    };

    const handleBack = () => {
        if (onStatusChange && currentStep > 0) {
            onStatusChange(ORDER_STATUSES[currentStep - 1]);
        }
    };

    const handleReset = () => {
        if (onStatusChange) {
            onStatusChange(ORDER_STATUSES[0]);
        }
    };

    return (
        <Box
            sx={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: 3 }}
        >
            {/* MUI Stepper Component */}
            <Stepper activeStep={currentStep} alternativeLabel>
                {ORDER_STATUSES.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Only render the demo controls if the user is the owner */}
            {isOwner && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mt: 3,
                    }}
                >
                    <Button
                        disabled={currentStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                    >
                        Back
                    </Button>

                    {currentStep === ORDER_STATUSES.length - 1 ? (
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
            )}
        </Box>
    );
}
