import { Order } from '@types';

/**
 * Represents the state structure for managing orders within a state management store.
 */
export interface OrderState {
    /** Full list of orders fetched for the current user or session history. */
    orders: Order[];
    /** Flag to indicate if an asynchronous order operation (fetching, creating, updating) is in progress. */
    orderLoading: boolean;
    /** Holds the error message if an order operation fails, or null if there are no errors. */
    orderError: string | null;
}
