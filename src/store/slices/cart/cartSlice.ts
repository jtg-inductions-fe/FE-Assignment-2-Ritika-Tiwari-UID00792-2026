import { DEFAULT_BILL_DETAILS, DELIVERY_FEE, PERCENT_OF_COST } from '@constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '@types';

import { CartState } from './cartSlice.types';

const initialState: CartState = {
    cartId: null,
    restaurant: null,
    items: [],
    billDetails: DEFAULT_BILL_DETAILS,
    cartLoading: false,
    cartError: null,
};

const recalculateTotals = (state: CartState) => {
    let subTotal = 0;
    let totalCount = 0;

    state.items.forEach((item) => {
        item.itemSubtotal = item.quantity * item.price;
        subTotal += item.itemSubtotal;
        totalCount += item.quantity;
    });

    if (subTotal > 0) {
        const onePercentOfCost = subTotal * PERCENT_OF_COST;
        let deliveryFee = Math.max(DELIVERY_FEE, onePercentOfCost);
        deliveryFee = Math.round(deliveryFee * 100) / 100;

        state.billDetails.itemsSubtotal = subTotal;
        state.billDetails.itemsCount = totalCount;
        state.billDetails.deliveryFee = deliveryFee;
        state.billDetails.grandTotal = subTotal + deliveryFee;
    } else {
        // Explicitly clear bill details when cart becomes empty
        state.billDetails = {
            itemsSubtotal: 0,
            deliveryFee: 20,
            grandTotal: 0,
            itemsCount: 0,
        };
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.cartId = action.payload.cartId;
            state.restaurant = action.payload.restaurant;
            state.items = action.payload.items;
            recalculateTotals(state);
        },

        addItemToCart: (
            state,
            action: PayloadAction<{
                item: CartItem;
            }>,
        ) => {
            const { item } = action.payload;

            const existingItem = state.items.find(
                (cartItem) => cartItem.itemId === item.itemId,
            );

            if (existingItem) {
                // Only increment if we haven't reached the stock limit
                if (existingItem.quantity < existingItem.stock) {
                    existingItem.quantity += 1;
                }
            } else {
                // First time adding to cart: start with exactly 1
                state.items.push({
                    ...item,
                    quantity: 1,
                    itemSubtotal: item.price,
                });
            }

            recalculateTotals(state);
        },

        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(
                (item) => item.itemId === action.payload,
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item.itemId !== action.payload,
                    );
                }
            }
            recalculateTotals(state);
        },

        deleteCompletely: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.itemId !== action.payload,
            );
            recalculateTotals(state);
        },

        setCartLoading: (state, action: PayloadAction<boolean>) => {
            state.cartLoading = action.payload;
        },

        setCartError: (state, action: PayloadAction<string | null>) => {
            state.cartError = action.payload;
        },

        clearCart: () => initialState,
    },
});

export const {
    setCart,
    addItemToCart,
    removeItemFromCart,
    deleteCompletely,
    setCartLoading,
    setCartError,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
