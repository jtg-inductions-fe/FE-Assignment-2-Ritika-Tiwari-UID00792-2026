import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';

import { theme } from '@theme';
import { ORDER_STATUS } from '@types';

import { OrderStatusTrackerProps } from './OrderStatusTracker.types';

export default function OrderStatusTracker({
    orderId,
    userRole,
    orderStatus,
    onStatusChange,
}: OrderStatusTrackerProps) {
    // Derive the active index from the incoming status prop
    let activeStep = ORDER_STATUS.indexOf(orderStatus);

    // Fallback to 0 if the status string doesn't match any index perfectly
    const currentStep = activeStep === -1 ? 0 : activeStep;

    // Determine if the current user has permission to change states
    const isOwner = userRole === 'owner';
    const handleNext = () => {
        activeStep = activeStep + 1;
        if (onStatusChange && currentStep < ORDER_STATUS.length - 2) {
            onStatusChange(orderId, ORDER_STATUS[activeStep]);
        }
    };

    const handleBack = () => {
        activeStep = activeStep - 1;
        if (onStatusChange && currentStep > 0) {
            onStatusChange(orderId, ORDER_STATUS[activeStep]);
        }
    };
    const handleReject = () => {
        if (onStatusChange) {
            onStatusChange(orderId, 'Rejected');
        }
    };

    return (
        <Box width="100%" marginTop={theme.spacing(4)}>
            {/* MUI Stepper Component */}
            {orderStatus !== 'Rejected' && (
                <Stepper activeStep={currentStep} alternativeLabel>
                    {ORDER_STATUS.filter(
                        (label) => label.toLowerCase() !== 'rejected',
                    ).map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}

            {/* Only render the demo controls if the user is the owner */}
            {isOwner && (
                <Box
                    display="flex"
                    justifyContent="center"
                    gap={theme.spacing(4)}
                    marginTop={theme.spacing(4)}
                >
                    {orderStatus !== 'Rejected' &&
                        orderStatus !== 'Delivered' && (
                            <>
                                <Button
                                    disabled={currentStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    variant="contained"
                                    color="primary"
                                >
                                    Next Status
                                </Button>
                            </>
                        )}
                    {orderStatus === 'Pending' && (
                        <Button
                            onClick={handleReject}
                            variant="outlined"
                            color="error"
                        >
                            Reject Order
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
}
