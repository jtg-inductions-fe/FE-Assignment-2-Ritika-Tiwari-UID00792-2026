import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '@types';

import { OrderState } from './order.types';

const initialState: OrderState = {
    orders: [],
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
    updateOrderStatus,
    setOrderLoading,
    setOrderError,
    clearOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
