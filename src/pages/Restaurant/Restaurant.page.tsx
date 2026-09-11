import RestaurantCard from 'components/RestaurantCard/RestaurantCard.component';

import { Box, Chip} from '@mui/material';

import {
    LoadingCardSkeleton,
    NullStateCard,
    ResponsiveContainer,
    SearchBar,
} from '@components';
import { useRestaurant } from '@hooks';

import { FilterContainer, OuterContainer } from './Restaurant.styles';
import { Restaurant as RestaurantData } from './Restaurant.types';

export const Restaurant = () => {
    const {
        filteredRestaurants,
        loading,
        error,
        activeCategory,
        setSearchTerm,
        handleFilterToggle,
        userRole,
    } = useRestaurant();

    return (
        <ResponsiveContainer>
            <OuterContainer>
                <SearchBar onSearch={setSearchTerm} />

                <FilterContainer>
                    <Chip
                        label="Veg"
                        onClick={() => handleFilterToggle('veg')}
                        variant={
                            activeCategory === 'veg' ? 'filled' : 'outlined'
                        }
                        color={activeCategory === 'veg' ? 'primary' : 'default'}
                        clickable
                        sx={{ textTransform: 'none', fontWeight: 500 }}
                    />

                    <Chip
                        label="Non-veg"
                        onClick={() => handleFilterToggle('non-veg')}
                        variant={
                            activeCategory === 'non-veg' ? 'filled' : 'outlined'
                        }
                        color={
                            activeCategory === 'non-veg' ? 'primary' : 'default'
                        }
                        clickable
                        sx={{ textTransform: 'none', fontWeight: 500 }}
                    />
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

                {!loading && (error || filteredRestaurants.length === 0) && (
                    <NullStateCard
                        title="Restaurant Page"
                        description={
                            error
                                ? 'Failed to load data.'
                                : 'No restaurants available.'
                        }
                    />
                )}

                {!loading &&
                    !error &&
                    filteredRestaurants.map((restaurant: RestaurantData) => (
                        <RestaurantCard
                            key={restaurant.restaurantId}
                            restaurant={restaurant}
                            userRole={userRole}
                        />
                    ))}
            </Box>
        </ResponsiveContainer>
    );
};
