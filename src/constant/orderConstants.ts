import { OrderStatus } from '@types';

/** Constant for assigning the color to each status of order.*/
export const STATUS_COLORS: Record<OrderStatus, string> = {
    Pending: 'warning.main',
    'Out for delivery': 'info.main',
    Rejected: 'error.main',
    Accepted: 'success.main',
    Preparing: 'info.main',
    Delivered: 'success.dark',
};
