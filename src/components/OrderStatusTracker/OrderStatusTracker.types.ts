import { OrderStatus, UserRole } from '@types';

export interface OrderStatusTrackerProps {
    orderId: string;
    userRole: UserRole;
    orderStatus: OrderStatus;
    onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}
