import { useEffect, useState } from 'react';

import { fetchOrderData } from 'services/order.services';

import { Box } from '@mui/material';

import { OrderAccordion, Snackbar } from '@components';
import { theme } from '@theme';
import { Order, SnackbarConfig } from '@types';

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

    const [orderData, setOrderData] = useState<Order[]>([]);

    /**
     * Automatically fetches the user's cart data from the server
     * when the component using this hook mounts.
     */
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const data = (await fetchOrderData({
                    signal: controller.signal,
                })) as Order[];
                setOrderData(data);
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') return;
                // Optionally update snackbarConfig here to display fetch errors to the user
            }
        };

        void fetchData();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Box flexGrow={1} marginBlock={theme.spacing(8)}>
            <Box
                display="flex"
                flexDirection="column"
                flexWrap="wrap"
                flexGrow={1}
                gap={theme.spacing(4)}
            >
                {/* Map through all orders and supply a unique key (assuming order has an id property) */}
                {orderData.map((order) => (
                    <OrderAccordion key={order.orderId} data={order} />
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
