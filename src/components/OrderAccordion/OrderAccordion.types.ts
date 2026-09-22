import { Order, OrderStatus, UserRole } from '@types';

/** Interface defining the configuration properties to render the order accordion component for orders. */
export interface OrderAccordionProps {
    /** Stores the orders data to render in accordion. */
    data: Order;
    /** Stores the user role of current registered user. */
    userRole: UserRole;
    /** Callback function to update the order status. */
    onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
    /** Flag that tracks the expandable state of accordion. */
    isExpanded: boolean;
    /** Callback function to handle the accordion closing state when other accordion is opened. */
    onToggle: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}
