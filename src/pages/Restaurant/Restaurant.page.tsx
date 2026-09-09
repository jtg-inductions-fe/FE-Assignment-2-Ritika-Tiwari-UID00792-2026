import { SetStateAction, useEffect, useState } from 'react';

import camelcaseKeys from 'camelcase-keys';
import RestaurantCard from 'components/RestaurantCard/RestaurantCard.component';
import { RestaurantProps } from 'components/RestaurantCard/RestaurantCard.types';
import { SearchBar } from 'components/SearchBar/SearchBar.component';

import { Box } from '@mui/material';

import { ResponsiveContainer } from '@components';

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

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    const onSearch = () => {};
    return (
        <ResponsiveContainer>
            <SearchBar onSearch={onSearch} />
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={2}
                alignItems="center"
                justifyContent="center"
                marginTop={3.2}
            >
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.restaurantId}
                        restaurant={restaurant}
                    />
                ))}
            </Box>
        </ResponsiveContainer>
    );
};
