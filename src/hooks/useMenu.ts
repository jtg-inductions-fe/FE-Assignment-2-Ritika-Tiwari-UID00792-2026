import { useEffect, useState } from 'react';

import { useAuth } from '@hooks';
import { fetchMenuItemsByRestaurantId } from '@services';
import {
    addMenuItems,
    deleteMenuItems,
    editMenuItems,
    setMenuError,
    setMenuItems,
    setMenuLoading,
} from '@store';
import { useAppDispatch } from '@store';
import { Menu } from '@types';

/** Custom hook to manage and provide Menu data. */
export const useMenu = (restaurantId: string | undefined) => {
    const { fetchUser } = useAuth();
    const registeredUser = fetchUser();
    const [filteredMenuItems, setFilteredMenuItems] = useState<Menu[]>([]);
    const dispatch = useAppDispatch();

    // Fetch data from mock json on mount and convert the variables to camel case.
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setMenuLoading(true));
                dispatch(setMenuError(null));
                if (restaurantId) {
                    const filteredData =
                        await fetchMenuItemsByRestaurantId(restaurantId);
                    setFilteredMenuItems(filteredData);
                    dispatch(setMenuItems(filteredData));
                }
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

    /** Function to handle add new menuItem in the redux store.
     * @param data- takes the MenuItem data.
     */
    const handleAddMenuItem = (data: Menu) => {
        if (data) {
            dispatch(addMenuItems(data));
        }
    };

    /** Function to handle edit existing MenuItem in the redux store.
     * @param data- takes the MenuItem data.
     */
    const handleEditMenuItem = (data: Menu) => {

        if (data) {
            dispatch(editMenuItems(data));
        }
    };

    /** Function to handle delete MenuItem in the redux store.
     * @param MenuItemId- takes the MenuItem id to delete the MenuItem.
     */
    const handleDeleteMenuItem = (ItemId: string) => {
        if (ItemId) {
            dispatch(deleteMenuItems(ItemId));
        }
    };

    return {
        userRole: registeredUser?.role,
        filteredMenuItems,
        handleAddMenuItem,
        handleEditMenuItem,
        handleDeleteMenuItem,
    };
};
