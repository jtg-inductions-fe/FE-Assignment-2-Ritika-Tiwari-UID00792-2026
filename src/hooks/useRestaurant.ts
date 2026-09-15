import { useCallback, useEffect, useState } from 'react';

import { useAuth, useDebounce } from '@hooks';
import { fetchRestaurantData } from '@services';
import {
    addRestaurant,
    deleteRestaurant,
    editRestaurant,
    setError,
    setFilteredRestaurantsView,
    setLoading,
    setRestaurants,
    useAppDispatch,
    useAppSelector,
} from '@store';
import { Restaurant } from '@types';

/**Custom hook to manage and provide restaurant data. */
export const useRestaurant = () => {
    const dispatch = useAppDispatch();
    const { fetchUser } = useAuth();
    const registeredUser = fetchUser();

    // Extract values from Redux state
    const { restaurants, filteredRestaurants, loading, error } = useAppSelector(
        (state) => state.restaurant,
    );

    // Local state for UI search terms and active filter categories.
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    // Use the debouncing on the searchTerm to prevent multiple search request.
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    // Fetch data from mock json on mount and convert the variables to camel case.
    useEffect(() => {
        // Flag to track is the component is still mounted/valid.
        let isCurrent = true;
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));

                let restaurantData = await fetchRestaurantData();

                // Filter based on user role
                if (registeredUser?.role === 'owner') {
                    restaurantData = restaurantData.filter(
                        (restaurant: Restaurant) =>
                            restaurant.ownerId === registeredUser.id,
                    );
                }
                if (isCurrent) {
                    dispatch(setRestaurants(restaurantData));
                }
            } catch (err) {
                if (isCurrent) {
                    dispatch(
                        setError(
                            err instanceof Error
                                ? err.message
                                : 'An error occurred',
                        ),
                    );
                }
            } finally {
                if (isCurrent) {
                    dispatch(setLoading(false));
                }
            }
            // Return the cleanup function to invalidate the request if dependency changes.
            return () => {
                isCurrent = false;
            };
        };

        void fetchData();
    }, [dispatch, registeredUser?.id, registeredUser?.role]);

    // Synchronize filters when search terms, categories or  data changes.
    useEffect(() => {
        const filtered = restaurants.filter((restaurant) => {
            const matchesSearch = restaurant.name
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase().trim());

            const matchesCategory = activeCategory
                ? restaurant.type === activeCategory
                : true;

            return matchesSearch && matchesCategory;
        });

        dispatch(setFilteredRestaurantsView(filtered));
    }, [restaurants, debouncedSearchTerm, activeCategory, dispatch]);

    /** Callback hook to handle filter toggle (veg/non-veg).
     * @param category- take the category type (veg/non-veg).
     */
    const handleFilterToggle = useCallback((category: string) => {
        setActiveCategory((prev) => (prev === category ? '' : category));
    }, []);

    /** Function to handle add new restaurant in the redux store.
     * @param data- takes the restaurant data.
     */
    const handleAddRestaurant = (data: Restaurant) => {
        if (data) {
            dispatch(addRestaurant(data));
        }
    };

    /** Function to handle edit existing restaurant in the redux store.
     * @param data- takes the restaurant data.
     */
    const handleEditRestaurant = (data: Restaurant) => {
        if (data) {
            dispatch(editRestaurant(data));
        }
    };

    /** Function to handle delete restaurant in the redux store.
     * @param restaurantId- takes the restaurant id to delete the restaurant.
     */
    const handleDeleteRestaurant = (restaurantId: string) => {
        if (restaurantId) {
            dispatch(deleteRestaurant(restaurantId));
        }
    };

    /** Function to check whether restaurant is closed or not based on the closing time.
     * @param openingTime - takes the opening time of restaurant.
     * @param closingTime - takes the closing time of restaurant.
     * @returns true/false
     */
    const isRestaurantClosed = (
        openingTime: string,
        closingTime: string,
    ): boolean => {
        // Get current time in the target timezone (Asia/Kolkata)
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            hour12: false,
        });

        const parts = formatter.formatToParts(new Date());
        const currentHour = parseInt(
            parts.find((p) => p.type === 'hour')!.value,
            10,
        );
        const currentMinute = parseInt(
            parts.find((p) => p.type === 'minute')!.value,
            10,
        );
        const currentMinutes = currentHour * 60 + currentMinute;

        // Helper function to convert "HH:MM AM/PM" or "HH:MM" to total minutes from midnight
        const parseTimeToMinutes = (timeStr: string): number => {
            const [time, modifier] = timeStr.trim().split(' ');
            const [hourStr, minuteStr] = time.split(':');
            let hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);

            if (modifier) {
                const upperModifier = modifier.toUpperCase();
                if (upperModifier === 'PM' && hour < 12) hour += 12;
                if (upperModifier === 'AM' && hour === 12) hour = 0;
            }

            return hour * 60 + minute;
        };

        const openMinutes = parseTimeToMinutes(openingTime);
        const closeMinutes = parseTimeToMinutes(closingTime);

        // Determine if the current time falls within operating hours
        let isOpen = false;

        if (closeMinutes > openMinutes) {
            // Standard daytime shift (e.g., 10:00 AM to 11:00 PM)
            isOpen =
                currentMinutes >= openMinutes && currentMinutes < closeMinutes;
        } else {
            // Overnight shift crossing midnight (e.g., 6:00 PM to 3:00 AM)
            isOpen =
                currentMinutes >= openMinutes || currentMinutes < closeMinutes;
        }

        return !isOpen;
    };

    return {
        filteredRestaurants,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        activeCategory,
        handleFilterToggle,
        userRole: registeredUser?.role,
        ownerId: registeredUser?.id,
        handleAddRestaurant,
        handleEditRestaurant,
        handleDeleteRestaurant,
        isRestaurantClosed,
    };
};
