import { SetStateAction, useEffect, useState } from 'react';

import camelcaseKeys from 'camelcase-keys';
import RestaurantCard from 'components/RestaurantCard/RestaurantCard.component';
import { RestaurantProps } from 'components/RestaurantCard/RestaurantCard.types';
import { SearchBar } from 'components/SearchBar/SearchBar.component';

import { Box, Typography } from '@mui/material';

import {
    LoadingCardSkeleton,
    NullStateCard,
    ResponsiveContainer,
} from '@components';

import {
    FilterContainer,
    GrowingButton,
    OuterContainer,
} from './Restaurant.styles';

export const Restaurant = () => {
    const [restaurants, setRestaurants] = useState<RestaurantProps[]>([]);
    const [filteredRestaurant, setFilteredRestaurant] =
        useState<RestaurantProps[]>(restaurants);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('');

    // Use useEffect to handle the side-effect (API call)
    useEffect(() => {
        // We define an async function inside the effect
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('mock/restaurants.json');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = (await response.json()) as RestaurantProps[];
                const camelCaseData = camelcaseKeys(data, {
                    deep: true,
                }) as RestaurantProps[];
                // Update the state with the retrieved data
                setRestaurants(camelCaseData);
                setFilteredRestaurant(camelCaseData);
            } catch (err) {
                setError(err as SetStateAction<null>);
            } finally {
                void setLoading(false);
            }
        };

        void fetchData();
    }, []);
    const onSearch = (searchTerm: string) => {
        setLoading(true);
        if (!searchTerm.trim) {
            setFilteredRestaurant(restaurants);
            return;
        }
        const lowerCaseSearch = searchTerm.toLowerCase();
        const filtered = restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(lowerCaseSearch),
        );
        setFilteredRestaurant(filtered);
        setLoading(false);

    };
    const onFilter = (category: string) => {
        setLoading(true);
        const filtered = restaurants.filter(
            (restaurant) => restaurant.type === category,
        );
        setFilteredRestaurant(filtered);
        setActiveCategory((prev) => (prev === category ? '' : category));
        setLoading(false);

    };

    return (
        <ResponsiveContainer>
            <OuterContainer>
                <SearchBar onSearch={onSearch} />
                <FilterContainer>
                    <GrowingButton
                        variant={
                            activeCategory === 'veg' ? 'contained' : 'outlined'
                        }
                        onClick={() => {
                            onFilter('veg');
                        }}
                    >
                        <Typography variant="button" textTransform="none">
                            Veg
                        </Typography>
                    </GrowingButton>
                    <GrowingButton
                        variant={
                            activeCategory === 'non-veg'
                                ? 'contained'
                                : 'outlined'
                        }
                        onClick={() => {
                            onFilter('non-veg');
                        }}
                    >
                        <Typography variant="button" textTransform="none">
                            Non-veg
                        </Typography>
                    </GrowingButton>
                </FilterContainer>
            </OuterContainer>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={2}
                alignItems="center"
                justifyContent="center"
                marginBlock={3.2}
            >
                {loading && (
                    <>
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                    </>
                )}
                {!loading && error && filteredRestaurant.length == 0 && (
                    <NullStateCard
                        title="Restaurant Page"
                        description="No restaurants available."
                    />
                )}
                {!loading &&
                    !error &&
                    filteredRestaurant &&
                    filteredRestaurant.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.restaurantId}
                            restaurant={restaurant}
                        />
                    ))}
            </Box>
        </ResponsiveContainer>
    );
};
