import { UserRole } from '@types';

export interface OrderStatusTrackerProps {
    userRole: UserRole;
    status: string;
    onStatusChange?: (newStatus: string) => void;
}
