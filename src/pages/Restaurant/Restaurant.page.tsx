import { useState } from 'react';

import RestaurantCard from 'components/RestaurantCard/RestaurantCard.component';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Chip, Fab, useMediaQuery } from '@mui/material';

import { Snackbar } from '@components';
import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    NullStateCard,
    ResponsiveContainer,
    SearchBar,
} from '@components';
import { useRestaurant } from '@hooks';
import { theme } from '@theme';

import { AddRestaurantModal } from './AddRestaurantModal/AddRestaurantModal';
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
        handleDeleteRestaurant,
        isRestaurantClosed,
    } = useRestaurant();

    // Modal Control States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] =
        useState<RestaurantData | null>(null);

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

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedRestaurantID, setSelectedRestaurantID] =
        useState<string>('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = (confirmation: boolean) => {
        setIsDialogOpen(false);
        if (confirmation) {
            try {
                handleDeleteRestaurant(selectedRestaurantID);
                setIsDialogOpen(true);
            } catch (err) {
                if (err) {
                    setIsSnackbarOpen(true);
                }
            }
        }
    };

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleOnDelete = (restaurantId: string) => {
        setIsDialogOpen(true);
        setSelectedRestaurantID(restaurantId);
    };

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ResponsiveContainer>
            <OuterContainer>
                <SearchBar onSearch={setSearchTerm} />
                <FilterContainer
                    aria-label="Restaurant food category filters"
                    role="group"
                >
                    {/* Vegetarian Category Selector */}
                    <Chip
                        label="Veg"
                        onClick={() => handleFilterToggle('veg')}
                        onDelete={
                            activeCategory === 'veg'
                                ? () => handleFilterToggle('veg')
                                : undefined
                        }
                        variant={
                            activeCategory === 'veg' ? 'filled' : 'outlined'
                        }
                        color={activeCategory === 'veg' ? 'primary' : 'default'}
                        clickable
                    />

                    {/* Non-Vegetarian Category Selector */}
                    <Chip
                        label="Non-veg"
                        onClick={() => handleFilterToggle('non-veg')}
                        onDelete={
                            activeCategory === 'non-veg'
                                ? () => handleFilterToggle('non-veg')
                                : undefined
                        }
                        variant={
                            activeCategory === 'non-veg' ? 'filled' : 'outlined'
                        }
                        color={
                            activeCategory === 'non-veg' ? 'primary' : 'default'
                        }
                        clickable
                    />
                </FilterContainer>
            </OuterContainer>

            {/* Add Restaurant option will only show to owners */}
            {userRole === 'owner' && isMobile && (
                <Fab
                    color="primary"
                    aria-label="add"
                    style={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                    }}
                >
                    <AddIcon />
                </Fab>
            )}

            {userRole === 'owner' && !isMobile && (
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
                        description={
                            error
                                ? 'Failed to load data.'
                                : 'No restaurants found, matching your criteria.'
                        }
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
                            onDelete={() =>
                                handleOnDelete(restaurant.restaurantId)
                            }
                            isRestaurantClosed={isRestaurantClosed(
                                restaurant.closingTime,
                            )}
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
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description="Are you sure you want to Delete?"
            />
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={() => setIsSnackbarOpen(false)}
                message="Some Error Occurred, Try later."
                state="error"
            />
        </ResponsiveContainer>
    );
};
