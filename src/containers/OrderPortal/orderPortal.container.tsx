import { useEffect, useState } from 'react';

import { fetchOrderData } from 'services/order.services';

import { Box } from '@mui/material';

import { OrderAccordion, Snackbar } from '@components';
import { useAuth } from '@hooks';
import { theme } from '@theme';
import { Order, SnackbarConfig, User } from '@types';

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
            }
        };

        void fetchData();

        return () => {
            controller.abort();
        };
    }, []);

    const { fetchCurrentUser } = useAuth();
    const user = fetchCurrentUser() as User;

    /**
     *Function to handle the status change event by owner.
     *@param newStatus - take the new status od order.
     */
    // const handleStatusChange=useCallback((newStatus:string)=>{

    // },[])

    return (
        <Box flexGrow={1} marginBlock={theme.spacing(8)}>
            <Box
                display="flex"
                flexDirection="column"
                flexWrap="wrap"
                flexGrow={1}
                gap={theme.spacing(4)}
            >
                {orderData.map((order) => (
                    <OrderAccordion
                        key={order.orderId}
                        data={order}
                        userRole={user?.role}
                        onStatusChange={() => {}}
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
