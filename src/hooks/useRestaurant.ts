import { useCallback, useEffect, useState } from 'react';

import camelcaseKeys from 'camelcase-keys';
import {
    Restaurant,
    Restaurant as RestaurantData,
} from 'pages/Restaurant/Restaurant.types';

import { useAuth } from '@hooks';
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

export const useRestaurant = () => {
    const dispatch = useAppDispatch();
    const { fetchUser } = useAuth();
    const registeredUser = fetchUser();

    // Extract values from Redux state
    const { restaurants, filteredRestaurants, loading, error } = useAppSelector(
        (state) => state.restaurant,
    );

    // Local state for UI search terms and active filter categories
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    // Fetch data from mock json on mount or user credential changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));

                const response = await fetch('mock/restaurants.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = (await response.json()) as RestaurantData[];
                let camelCaseData = camelcaseKeys(data, {
                    deep: true,
                }) as RestaurantData[];

                // Filter based on user role
                if (registeredUser?.role === 'owner') {
                    camelCaseData = camelCaseData.filter(
                        (restaurant) =>
                            restaurant.ownerId === registeredUser.id,
                    );
                }

                dispatch(setRestaurants(camelCaseData));
            } catch (err) {
                dispatch(
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'An error occurred',
                    ),
                );
            } finally {
                dispatch(setLoading(false));
            }
        };

        void fetchData();
    }, [dispatch, registeredUser?.id, registeredUser?.role]);

    // Synchronize filters when search terms, categories or base data shifts
    useEffect(() => {
        const filtered = restaurants.filter((restaurant) => {
            const matchesSearch = restaurant.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim());

            const matchesCategory = activeCategory
                ? restaurant.type === activeCategory
                : true;

            return matchesSearch && matchesCategory;
        });

        dispatch(setFilteredRestaurantsView(filtered));
    }, [restaurants, searchTerm, activeCategory, dispatch]);

    // Category toggling handler
    const handleFilterToggle = useCallback((category: string) => {
        setActiveCategory((prev) => (prev === category ? '' : category));
    }, []);

    const handleAddRestaurant = (data: Restaurant) => {
        if (data) {
            dispatch(addRestaurant(data));
        }
    };
    const handleEditRestaurant = (data: Restaurant) => {
        if (data) {
            dispatch(editRestaurant(data));
        }
    };
    const handleDeleteRestaurant = (restaurantId: string) => {
        if (restaurantId) {
            dispatch(deleteRestaurant(restaurantId));
        }
    };

    const isRestaurantClosed = (closingTime: string): boolean => {
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

        const currentTotalMinutes = currentHour * 60 + currentMinute;

        let [time, modifier] = closingTime.split(' ');
        let [closingHourStr, closingMinuteStr] = time.split(':');
        let closingHour = parseInt(closingHourStr, 10);
        const closingMinute = parseInt(closingMinuteStr, 10);

        if (modifier) {
            if (modifier.toUpperCase() === 'PM' && closingHour < 12)
                closingHour += 12;
            if (modifier.toUpperCase() === 'AM' && closingHour === 12)
                closingHour = 0;
        }

        const closingTotalMinutes = closingHour * 60 + closingMinute;

        return currentTotalMinutes >= closingTotalMinutes;
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
        handleAddRestaurant,
        handleEditRestaurant,
        handleDeleteRestaurant,
        isRestaurantClosed,
    };
};
