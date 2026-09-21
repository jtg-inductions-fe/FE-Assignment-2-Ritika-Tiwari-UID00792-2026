import { Order, UserRole } from '@types';

export interface OrderAccordionProps {
    data: Order;
    userRole: UserRole;
    onStatusChange?: (newStatus: string) => void;
}
