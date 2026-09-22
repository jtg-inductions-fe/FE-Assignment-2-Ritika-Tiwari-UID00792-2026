import { OrderStatus } from '@types';

// Define the array as a read-only tuple using 'as const'
export const ORDER_STATUS = [
    'Pending',
    'Accepted',
    'Preparing',
    'Out for delivery',
    'Delivered',
    'Rejected',
] as const;
/** Constant for assigning the color to each status of order.*/
export const STATUS_COLORS: Record<OrderStatus, string> = {
    Pending: 'warning.main',
    'Out for delivery': 'info.main',
    Rejected: 'error.main',
    Accepted: 'success.main',
    Preparing: 'info.main',
    Delivered: 'success.dark',
};
