import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStatus } from '@types';

import { Order, OrderState } from './order.types';

const initialState: OrderState = {
    orders: [],
    selectedOrder: null,
    orderLoading: false,
    orderError: null,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // Set all Orders
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },

        // Add a single new order to the top of the history list
        addNewOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
        },

        // Select an active order to view its specific tracking details
        setSelectedOrder: (state, action: PayloadAction<string>) => {
            state.selectedOrder =
                state.orders.find(
                    (order) => order.orderId === action.payload,
                ) || null;
        },

        // Clear tracking details when navigating away from the order tracker
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },

        // Update status of an individual order.
        updateOrderStatus: (
            state,
            action: PayloadAction<{
                orderId: string;
                status: OrderStatus;
            }>,
        ) => {
            const { orderId, status } = action.payload;

            // Update the order inside the history list
            const existingOrder = state.orders.find(
                (order) => order.orderId === orderId,
            );
            if (existingOrder) {
                existingOrder.orderStatus = status;
            }

            // Synchronize active state if it's the order currently being viewed
            if (
                state.selectedOrder &&
                state.selectedOrder.orderId === orderId
            ) {
                state.selectedOrder.orderStatus = status;
            }
        },

        setOrderLoading: (state, action: PayloadAction<boolean>) => {
            state.orderLoading = action.payload;
        },

        setOrderError: (state, action: PayloadAction<string | null>) => {
            state.orderError = action.payload;
        },

        // Reset state entirely back to empty initial values
        clearOrderState: () => initialState,
    },
});

export const {
    setOrders,
    addNewOrder,
    setSelectedOrder,
    clearSelectedOrder,
    updateOrderStatus,
    setOrderLoading,
    setOrderError,
    clearOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
