import { useCallback, useEffect, useState } from 'react';

import { fetchOrderData } from 'services/order.services';
import {
    setOrderError,
    setOrderLoading,
    setOrders,
    updateOrderStatus,
} from 'store/slices/Order/orderSlice';

import { Box } from '@mui/material';

import { OrderAccordion, Snackbar } from '@components';
import { useAuth } from '@hooks';
import { useAppDispatch, useAppSelector } from '@store';
import { theme } from '@theme';
import { OrderStatus, SnackbarConfig, User } from '@types';

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
    const { orders } = useAppSelector((state) => state.order);

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

    const { fetchCurrentUser } = useAuth();
    const user = fetchCurrentUser() as User;

    /**
     * Function to handle the status change event by owner.
     * @param newStatus - take the new status of order.
     */
    const handleStatusChange = useCallback(
        (orderId: string, newStatus: OrderStatus) => {
            dispatch(
                updateOrderStatus({ orderId: orderId, status: newStatus }),
            );
        },
        [dispatch],
    );

    const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

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
                {orders.map((order) => (
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
        </Box>
    );
};
