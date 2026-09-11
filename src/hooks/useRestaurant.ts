import { useCallback, useEffect, useState } from 'react';

import camelcaseKeys from 'camelcase-keys';
import { Restaurant as RestaurantData } from 'pages/Restaurant/Restaurant.types';

import { useAuth } from '@hooks';
import {
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

    return {
        filteredRestaurants,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        activeCategory,
        handleFilterToggle,
        userRole: registeredUser?.role,
    };
};
