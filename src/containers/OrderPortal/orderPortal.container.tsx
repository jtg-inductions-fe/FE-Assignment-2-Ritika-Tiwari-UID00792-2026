import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchOrderData } from 'services/order.services';
import {
    setOrderError,
    setOrderLoading,
    setOrders,
    updateOrderStatus,
} from 'store/slices/Order/orderSlice';

import { Box } from '@mui/material';

import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    NullStateCard,
    OrderAccordion,
    Snackbar,
} from '@components';
import { useAuth } from '@hooks';
import { useAppDispatch, useAppSelector } from '@store';
import { theme } from '@theme';
import { Order, OrderStatus, SnackbarConfig, User } from '@types';

/**
 * Renders order container.

 * Provide the business logic for the order portal page like display the orders, order status update, order reject and canceled by the owner.
 */
export const OrderPortal = () => {
    // State to manage the configuration (visibility, message and state) of the snackbar.
    const [snackbarConfig, setSnackBarConfig] = useState<SnackbarConfig>({
        open: false,
        message: '',
        variant: 'success',
    });

    const dispatch = useAppDispatch();
    const { orders, orderLoading, orderError } = useAppSelector(
        (state) => state.order,
    );

    /**
     * Automatically fetches the user's cart data from the server
     * when the component using this hook mounts.
     */
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                dispatch(setOrderLoading(true));
                dispatch(setOrderError(null));

                const orderData = await fetchOrderData({
                    signal: controller.signal,
                });
                dispatch(setOrders(orderData));
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') return;

                dispatch(
                    setOrderError(
                        err instanceof Error
                            ? err.message
                            : 'An error occurred',
                    ),
                );
            } finally {
                dispatch(setOrderLoading(false));
            }
        };

        void fetchData();

        return () => {
            controller.abort();
        };
    }, [dispatch]);

    // Fetching the current registered user data from the auth hook.
    const { fetchCurrentUser } = useAuth();
    const user = fetchCurrentUser() as User;

    // Compute the filtered list dynamically.
    const filteredOrders = useMemo(() => {
        if (!user || !orders) return [];
        // Filter based on user role if they are an owner
        if (user?.role === 'owner') {
            return orders.filter(
                (order: Order) => order.restaurantDetails.ownerId === user.id,
            );
        } else {
            return orders.filter(
                (order: Order) => order.customerDetails.id === user.id,
            );
        }
    }, [user, orders]);

    const [pendingUpdate, setPendingUpdate] = useState<{
        id: string;
        status: OrderStatus;
    } | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = useCallback(() => {
        if (!pendingUpdate) return;
        try {
            dispatch(
                updateOrderStatus({
                    orderId: pendingUpdate.id,
                    status: pendingUpdate.status,
                }),
            );
            setSnackBarConfig({
                open: true,
                message: 'Order rejected successfully.',
                variant: 'success',
            });
        } catch {
            setSnackBarConfig({
                open: true,
                message: 'Some error occurred, Try again later.',
                variant: 'error',
            });
        } finally {
            setIsDialogOpen(false);
        }
    }, [dispatch, pendingUpdate]);

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = useCallback(() => {
        setIsDialogOpen(false);
        setPendingUpdate(null);
    }, []);

    /**
     * Function to handle the status change event by owner.
     * @param newStatus - take the new status of order.
     */
    const handleStatusChange = useCallback(
        (orderId: string, newStatus: OrderStatus) => {
            if (newStatus === 'Rejected') {
                setPendingUpdate({ id: orderId, status: newStatus });
                setIsDialogOpen(true);
            } else {
                dispatch(updateOrderStatus({ orderId, status: newStatus }));
            }
        },
        [dispatch],
    );

    // expandablePanel state for the accordion panels.
    const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

    // Handle the accordions change, e.g. opened accordion should be closed when other will open.
    const handleAccordionChange =
        (panelId: string) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedPanel(isExpanded ? panelId : false);
        };

    return (
        <Box flexGrow={1} marginBlock={theme.spacing(8)}>
            <Box
                display="flex"
                flexDirection="column"
                flexWrap="wrap"
                flexGrow={1}
                gap={theme.spacing(4)}
            >
                {orderLoading && (
                    <>
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                    </>
                )}
                {!orderLoading &&
                    (orderError || filteredOrders.length === 0) && (
                        <NullStateCard
                            title=""
                            description={
                                orderError
                                    ? 'Failed to load data of orders.'
                                    : 'No orders are available.'
                            }
                        />
                    )}

                {!orderLoading &&
                    !orderError &&
                    filteredOrders.map((order) => (
                        <OrderAccordion
                            key={order.orderId}
                            data={order}
                            userRole={user?.role}
                            onStatusChange={handleStatusChange}
                            isExpanded={expandedPanel === order.orderId}
                            onToggle={handleAccordionChange(order.orderId)}
                        />
                    ))}
            </Box>
            <Snackbar
                open={snackbarConfig.open}
                autoHideDuration={1000}
                onClose={() =>
                    setSnackBarConfig({ ...snackbarConfig, open: false })
                }
                message={snackbarConfig.message}
                state={snackbarConfig.variant}
            />
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description="Are you sure, you want to reject this order?"
            />
        </Box>
    );
};
