import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    useMediaQuery,
} from '@mui/material';

import { ORDER_STATUS } from '@constant';
import { theme } from '@theme';

import { OrderStatusTrackerProps } from './OrderStatusTracker.types';

/**
 * OrderStatusTracker component to show orders status as stepper.
 *
 * @param OrderStatusTracker -  The configuration properties for the rendering of OrderStatusTracker.
 * @returns returns the JSX.Element
 */
export const OrderStatusTracker = ({
    orderId,
    userRole,
    orderStatus,
    onStatusChange,
}: OrderStatusTrackerProps) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Derive the active index from the incoming status prop
    let activeStep = ORDER_STATUS.indexOf(orderStatus);

    // Fallback to 0 if the status string doesn't match any index perfectly
    const currentStep = activeStep === -1 ? 0 : activeStep;

    // Determine if the current user has permission to change states
    const isOwner = userRole === 'owner';

    /** Function to handle the update of order status to next stage. */
    const handleNext = () => {
        activeStep = activeStep + 1;
        if (onStatusChange && currentStep < ORDER_STATUS.length - 2) {
            onStatusChange(orderId, ORDER_STATUS[activeStep]);
        }
    };

    /** Function to handle the update of order status to previous stage. */
    const handleBack = () => {
        activeStep = activeStep - 1;
        if (onStatusChange && currentStep > 0) {
            onStatusChange(orderId, ORDER_STATUS[activeStep]);
        }
    };

    /** Function to handle the update of order status to rejected stage. */
    const handleReject = () => {
        if (onStatusChange) {
            onStatusChange(orderId, 'Rejected');
        }
    };

    return (
        <Box width="100%" marginTop={theme.spacing(4)}>
            {/* MUI Stepper Component */}
            {orderStatus !== 'Rejected' && (
                <Stepper
                    activeStep={currentStep}
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                    alternativeLabel={!isMobile}
                >
                    {ORDER_STATUS.filter(
                        (label) => label.toLowerCase() !== 'rejected',
                    ).map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}

            {/* Only render the button controls if the user is the owner */}
            {isOwner && (
                <Box
                    display="flex"
                    justifyContent="center"
                    gap={theme.spacing(4)}
                    marginBlock={theme.spacing(4)}
                >
                    {orderStatus !== 'Rejected' &&
                        orderStatus !== 'Delivered' && (
                            <>
                                {orderStatus !== 'Accepted' && (
                                    <Button
                                        disabled={currentStep === 0}
                                        onClick={handleBack}
                                        variant="outlined"
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    onClick={handleNext}
                                    variant="contained"
                                    color="primary"
                                >
                                    Next Status
                                </Button>
                            </>
                        )}
                    {/* Owner can only reject the order if it is not accepted.*/}
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
};
