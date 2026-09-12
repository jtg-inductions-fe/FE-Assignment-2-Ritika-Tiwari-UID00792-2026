import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Chip, Fab, useMediaQuery } from '@mui/material';

import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    NullStateCard,
    ResponsiveContainer,
    RestaurantCard,
    RestaurantModal,
    SearchBar,
    Snackbar,
} from '@components';
import { useRestaurant } from '@hooks';
import { ROUTES } from '@routes';
import { theme } from '@theme';
import { Restaurant as RestaurantData } from '@types';

import { FilterContainer, OuterContainer } from './Restaurant.styles';

/**
 * Renders the Restaurant page.
 * @returns JSX.Element - The rendered Restaurant page.
 */
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

    /** State to control the Add and edit modals. */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] =
        useState<RestaurantData | null>(null);

    /** Handle Add restaurant modal open state. */
    const handleOpenAddModal = () => {
        setEditingRestaurant(null);
        setIsModalOpen(true);
    };

    /** Handle Edit restaurant modal open state. */
    const handleOpenEditModal = (restaurant: RestaurantData) => {
        setEditingRestaurant(restaurant);
        setIsModalOpen(true);
    };

    /** Handle edit and add restaurant modal closing state */
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

    /**
     * Function to handle delete restaurant event.
     * @param restaurantId - restaurant id is used to delete the selected restaurant.
     */
    const handleOnDelete = (restaurantId: string) => {
        setIsDialogOpen(true);
        setSelectedRestaurantID(restaurantId);
    };

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    /**
     * Function to handle click event on the restaurant card.
     * @param restaurantId - restaurant id of clicked restaurant.
     */
    const handleRestaurantClick = (restaurantId: string) => {
       void navigate(ROUTES.MENU.replace(':restaurantId', restaurantId));
    };

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
                    onClick={handleOpenAddModal}
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
                gap={theme.spacing(2)}
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
                            onRestaurantClick={() =>
                                handleRestaurantClick(restaurant.restaurantId)
                            }
                            isRestaurantClosed={isRestaurantClosed(
                                restaurant.closingTime,
                            )}
                        />
                    ))}
            </Box>

            {/* Reusable form modal for both edit and add restaurant */}
            <RestaurantModal
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
