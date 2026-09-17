import { useEffect } from 'react';

import { fetchCartData } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import {
    clearCart,
    deleteCompletely,
    removeItemFromCart,
    setCart,
    setCartError,
    setCartLoading,
} from '@store';

export const useCart = () => {
    const dispatch = useAppDispatch();

    const { items, billDetails, cartId, restaurant, cartLoading, cartError } =
        useAppSelector((state) => state.cart);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setCartLoading(true));
                dispatch(setCartError(null));
                const cartData = await fetchCartData();
                dispatch(setCart(cartData));
            } catch (err) {
                dispatch(
                    setCartError(
                        err instanceof Error
                            ? err.message
                            : 'An error occurred',
                    ),
                );
            } finally {
                dispatch(setCartLoading(false));
            }
        };
        void fetchData();
    }, [dispatch]);

    const handleRemoveFromCart = (menuItemId: string) => {
        dispatch(removeItemFromCart(menuItemId));
    };

    const handleRemoveItemCompletely = (menuItemId: string) => {
        dispatch(deleteCompletely(menuItemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const cartCount = () => items.length;

    return {
        items,
        billDetails,
        cartLoading,
        cartError,
        cartId,
        restaurant,
        handleClearCart,
        handleRemoveFromCart,
        handleRemoveItemCompletely,
        cartCount,
    };
};
