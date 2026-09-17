import { useEffect } from 'react';

import { useAuth } from '@hooks';
import { fetchMenuItemsByRestaurantId } from '@services';
import {
    addItemToCart,
    decrementStock,
    incrementStock,
    setMenuError,
    setMenuItems,
    setMenuLoading,
    useAppDispatch,
    useAppSelector,
} from '@store';

/** Custom hook to manage and provide Menu data. */
export const useMenu = (restaurantId: string | undefined) => {
    const { fetchCurrentUser } = useAuth();
    const registeredUser = fetchCurrentUser();
    const dispatch = useAppDispatch();

    //  Extract values directly from Redux state
    const { menuItems, menuLoading, menuError } = useAppSelector(
        (state) => state.menu,
    );

    //  Fetch data only when restaurantId or dispatch changes
    useEffect(() => {
        if (!restaurantId) return;

        const fetchData = async () => {
            try {
                dispatch(setMenuLoading(true));
                dispatch(setMenuError(null));
                const filteredData =
                    await fetchMenuItemsByRestaurantId(restaurantId);
                dispatch(setMenuItems(filteredData));
            } catch (err) {
                dispatch(
                    setMenuError(
                        err instanceof Error
                            ? err.message
                            : 'An error occurred',
                    ),
                );
            } finally {
                dispatch(setMenuLoading(false));
            }
        };

        void fetchData();
    }, [dispatch, restaurantId]);

    /** Function to handle add to cart a menu item and decrement the stock quantity.
     * @param id - id of the item
     * @param quantity - selected quantity of the item.
     * @returns void
     */
    const handleAddToCart = (id: string) => {
        const item = menuItems.find((i) => id === i.itemId);
        if (item) {
            if (item.stock <= 0) return;
            dispatch(
                addItemToCart({
                    item: {
                        itemId: item.itemId,
                        name: item.name,
                        imageUrl: item.imageUrl,
                        price: item.price,
                        stock: item.stock,
                        type: item.type,
                        quantity: 0,
                        itemSubtotal: 0,
                    },
                }),
            );
        } else {
            return null;
        }
    };

    /** Function to handle restock a MenuItem in the redux store.
     *  @param id - id of the item
     *  @returns void
     */
    const handleIncrease = (id: string) => {
        dispatch(incrementStock(id));
    };

    /** Function to handle decrement the stock quantity of a menu item in the redux store.
     *  @param id - id of the item
     *  @returns void
     */
    const handleDecrease = (id: string) => {
        dispatch(decrementStock({ id }));
    };

    return {
        userRole: registeredUser?.role,
        menuLoading,
        menuError,
        filteredMenuItems: menuItems,
        handleAddToCart,
        handleIncrease,
        handleDecrease,
    };
};
