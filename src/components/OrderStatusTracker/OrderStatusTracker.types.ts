import { OrderStatus, UserRole } from '@types';

/** Interface defining the configuration properties to render the order status tracker component for orders. */
export interface OrderStatusTrackerProps {
    /** Stores the order id to uniquely select the orders. */
    orderId: string;
    /** Stores the user role. */
    userRole: UserRole;
    /** Stores the current status of order.  */
    orderStatus: OrderStatus;
    /** Callback function to update the order status. */
    onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}
