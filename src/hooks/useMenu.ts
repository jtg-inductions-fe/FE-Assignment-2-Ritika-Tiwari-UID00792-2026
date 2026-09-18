import { useEffect } from 'react';

import { useAuth } from '@hooks';
import { fetchMenuItemsByRestaurantId } from '@services';
import {
    addMenuItems,
    decrementStock,
    deleteMenuItems,
    editMenuItems,
    incrementStock,
    setMenuError,
    setMenuItems,
    setMenuLoading,
    useAppDispatch,
    useAppSelector,
} from '@store';
import { Menu } from '@types';

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

    /** Function to handle adding a new menu item in the redux store.
     * @param data - new item's data
     * @returns void
     */
    const handleAddMenuItem = (data: Menu) => {
        if (data) dispatch(addMenuItems(data));
    };

    /** Function to handle editing an existing MenuItem in the redux store.
     * @param data - updated item's data
     * @returns void
     */
    const handleEditMenuItem = (data: Menu) => {
        if (data) dispatch(editMenuItems(data));
    };

    /** Function to handle deleting a MenuItem in the redux store.
     * @param itemId - item id of the item
     * @returns void
     */
    const handleDeleteMenuItem = (itemId: string) => {
        if (itemId) dispatch(deleteMenuItems(itemId));
    };

    /** Function to handle add to cart a menu item and decrement the stock quantity.
     * @param id - id of the item
     * @param quantity - selected quantity of the item.
     * @returns void
     */
    const handleAddToCart = (id: string, quantity: number) => {
        const item = menuItems.find((i) => id === i.itemId);
        return item?.stock ? quantity : undefined;
    };

    /** Function to handle restock a MenuItem in the redux store.
     *  @param id - id of the item
     *  @returns void
     */
    const handleIncreaseStock = (id: string) => {
        dispatch(incrementStock(id));
    };

    /** Function to handle decrement the stock quantity of a menu item in the redux store.
     *  @param id - id of the item
     *  @returns void
     */
    const handleDecreaseStock = (id: string) => {
        dispatch(decrementStock({ id }));
    };

    return {
        userRole: registeredUser?.role,
        menuLoading,
        menuError,
        filteredMenuItems: menuItems,
        handleAddMenuItem,
        handleEditMenuItem,
        handleDeleteMenuItem,
        handleAddToCart,
        handleIncreaseStock,
        handleDecreaseStock,
    };
};
