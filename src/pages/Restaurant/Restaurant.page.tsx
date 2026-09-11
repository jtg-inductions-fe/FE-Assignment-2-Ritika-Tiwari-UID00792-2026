import { useState } from 'react';
import { Box, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LoadingCardSkeleton, NullStateCard, ResponsiveContainer, SearchBar } from '@components';
import RestaurantCard from 'components/RestaurantCard/RestaurantCard.component';
import { FilterContainer, OuterContainer } from './Restaurant.styles';
import { useRestaurant } from '@hooks';
import { AddRestaurantModal } from './AddRestaurantModal/AddRestaurantModal';
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

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<RestaurantData | null>(null);

  const handleOpenAddModal = () => {
    setEditingRestaurant(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (restaurant: RestaurantData) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRestaurant(null);
  };

  return (
    <ResponsiveContainer>
      <OuterContainer>

        <SearchBar onSearch={setSearchTerm} />
        <FilterContainer aria-label="Restaurant food category filters" role="group">
          {/* Vegetarian Category Selector */}
          <Chip
            label="Veg"
            onClick={() => handleFilterToggle('veg')}
            onDelete={activeCategory === 'veg' ? () => handleFilterToggle('veg') : undefined}
            variant={activeCategory === 'veg' ? 'filled' : 'outlined'}
            color={activeCategory === 'veg' ? 'primary' : 'default'}
            clickable
          />

          {/* Non-Vegetarian Category Selector */}
          <Chip
            label="Non-veg"
            onClick={() => handleFilterToggle('non-veg')}
            onDelete={activeCategory === 'non-veg' ? () => handleFilterToggle('non-veg') : undefined}
            variant={activeCategory === 'non-veg' ? 'filled' : 'outlined'}
            color={activeCategory === 'non-veg' ? 'primary' : 'default'}
            clickable
            />
        </FilterContainer>
      </OuterContainer>
       {/* Add Restaurant option will only show to owners */}
            {userRole === 'owner' && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddModal}
              >
                Add Restaurant
              </Button>
            )}
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
          </>
        )}

        {!loading && (error || filteredRestaurants.length === 0) && (
          <NullStateCard
            title="Restaurant Page"
            description={error ? 'Failed to load data.' : 'No restaurants found matching your criteria.'}
          />
        )}

        {!loading &&
          !error &&
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.restaurantId}
              restaurant={restaurant}
              userRole={userRole}
              onEditClick={() => handleOpenEditModal(restaurant)}
            />
          ))}
      </Box>

      {/* Reusable From modal for both edit and add restaurant */}
      <AddRestaurantModal
        open={isModalOpen}
        onClose={handleCloseModal}
        ownerId="current_owner_id"
        restaurantToEdit={editingRestaurant}
      />
    </ResponsiveContainer>
  );
};
