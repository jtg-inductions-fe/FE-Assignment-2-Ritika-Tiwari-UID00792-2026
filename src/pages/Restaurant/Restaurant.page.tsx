import { SetStateAction, useEffect, useState } from 'react';

import camelcaseKeys from 'camelcase-keys';
import RestaurantCard from 'components/RestaurantCard/RestaurantCard.component';
import { RestaurantProps } from 'components/RestaurantCard/RestaurantCard.types';
import { SearchBar } from 'components/SearchBar/SearchBar.component';

import { Box } from '@mui/material';

import {
    LoadingCardSkeleton,
    NullStateCard,
    ResponsiveContainer,
} from '@components';
import {
    FilterContainer,
    GrowingButton,
    OuterContainer,
} from 'components/RestaurantCard/RestaurantCard.styles';

export const Restaurant = () => {
    const [restaurants, setRestaurants] = useState<RestaurantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                setError(err as SetStateAction<null>);
            } finally {
                void setLoading(false);
            }
        };

        void fetchData();
    }, []);
    const onSearch = () => {};

    return (
        <ResponsiveContainer>
            <OuterContainer>
                <SearchBar onSearch={onSearch} />
                <FilterContainer>
                    <GrowingButton variant="outlined">Veg</GrowingButton>
                    <GrowingButton variant="outlined">Non-veg</GrowingButton>
                </FilterContainer>
            </OuterContainer>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={2}
                alignItems="center"
                justifyContent="center"
                marginTop={3.2}
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
                {!loading && error && (
                    <NullStateCard
                        title="Restaurant Page"
                        description="No restaurants available."
                    />
                )}
                {!loading &&
                    !error &&
                    restaurants &&
                    restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.restaurantId}
                            restaurant={restaurant}
                        />
                    ))}
            </Box>
        </ResponsiveContainer>
    );
};
