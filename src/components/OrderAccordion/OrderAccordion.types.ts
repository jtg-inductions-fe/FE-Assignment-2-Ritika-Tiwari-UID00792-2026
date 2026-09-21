import { Order, OrderStatus, UserRole } from '@types';

export interface OrderAccordionProps {
    data: Order;
    userRole: UserRole;
    onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
    isExpanded: boolean;
    onToggle: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}
