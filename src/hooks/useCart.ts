import { useAppDispatch, useAppSelector } from '@store'; // Adjust path to your typed Redux hooks
import { CartItem } from '@types';
import {
    addItemToCart,
    removeItemFromCart,
    deleteCompletely,
    clearCart,
    setCart,
    setCartLoading,
    setCartError,
} from '@store';
import { useEffect } from 'react';
import { fetchCartData } from '@services';

export const useCart = () => {
    const dispatch = useAppDispatch();

    // Selectors to access cart state fields
    const items = useAppSelector((state) => state.cart.items);
    const billDetails = useAppSelector((state) => state.cart.billDetails);
    const loading = useAppSelector((state) => state.cart.cartLoading);
    const error = useAppSelector((state) => state.cart.cartError);
    const cartId = useAppSelector((state) => state.cart.cartId);
    const restaurant = useAppSelector((state) => state.cart.restaurant);

    //  Fetch data only when restaurantId or dispatch changes
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
    }, []);

    const addToCart = (
        item: Omit<CartItem, 'quantity' | 'subtotal'>,
        quantity: number = 1,
    ) => {
        dispatch(addItemToCart({ item, quantity }));
    };

    const removeFromCart = (menuItemId: string) => {
        dispatch(removeItemFromCart(menuItemId));
    };

    const removeItemCompletely = (menuItemId: string) => {
        dispatch(deleteCompletely(menuItemId));
    };

    const resetCart = () => {
        dispatch(clearCart());
    };

    const updateLoading = (isLoading: boolean) => {
        dispatch(setCartLoading(isLoading));
    };

    const updateError = (errorMessage: string | null) => {
        dispatch(setCartError(errorMessage));
    };

    return {
        items,
        billDetails,
        loading,
        error,
        cartId,
        restaurant,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        resetCart,
        updateLoading,
        updateError,
    };
};
