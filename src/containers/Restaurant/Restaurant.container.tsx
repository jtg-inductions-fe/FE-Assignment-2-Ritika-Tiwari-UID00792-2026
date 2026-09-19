import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Chip, Fab, useMediaQuery } from '@mui/material';

import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    NullStateCard,
    RestaurantCard,
    RestaurantModal,
    SearchBar,
    Snackbar,
} from '@components';
import { useRestaurant } from '@hooks';
import { ROUTES } from '@routes';
import {
    addRestaurant,
    deleteRestaurant,
    editRestaurant,
    useAppDispatch,
} from '@store';
import { theme } from '@theme';
import { Restaurant as RestaurantData, SnackbarConfig } from '@types';

import { FilterContainer, OuterContainer } from './Restaurant.styles';


/**
 * Restaurant Container
 * provides the business logic for restaurant page and restaurants state management, including functionality to add, edit, and delete restaurants.
 * @returns The rendered restaurant page components.
 */
export const Restaurant = () => {
    const dispatch = useAppDispatch();

    /** Function to handle add new restaurant in the redux store.
     * @param data- takes the restaurant data.
     */
    const handleAddRestaurant = useCallback(
        (data: RestaurantData) => {
            if (data) {
                dispatch(addRestaurant(data));
            }
        },
        [dispatch],
    );

    /** Function to handle edit existing restaurant in the redux store.
     * @param data- takes the restaurant data.
     */
    const handleEditRestaurant = useCallback(
        (data: RestaurantData) => {
            if (data) {
                dispatch(editRestaurant(data));
            }
        },
        [dispatch],
    );

    /** Function to handle delete restaurant in the redux store.
     * @param restaurantId- takes the restaurant id to delete the restaurant.
     */
    const handleDeleteRestaurant = useCallback(
        (restaurantId: string) => {
            if (restaurantId) {
                dispatch(deleteRestaurant(restaurantId));
            }
        },
        [dispatch],
    );

    const {
        filteredRestaurants,
        loading,
        error,
        activeCategory,
        setSearchTerm,
        handleFilterToggle,
        userRole,
        ownerId,
        isRestaurantClosed,
    } = useRestaurant();

    // State to manage the configuration (visibility,message and state) of the snackbar.
    const [snackbarConfig, setSnackBarConfig] = useState<SnackbarConfig>({
        open: false,
        message: '',
        variant: 'success',
    });

    /** State to control the Add and edit modals. */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] =
        useState<RestaurantData | null>(null);

    /** Handle Add restaurant modal open state. */
    const handleOpenAddModal = useCallback(() => {
        setEditingRestaurant(null);
        setIsModalOpen(true);
    }, []);

    /** Handle Edit restaurant modal open state. */
    const handleOpenEditModal = (restaurant: RestaurantData) => {
        setEditingRestaurant(restaurant);
        setIsModalOpen(true);
    };

    /** Handle edit and add restaurant modal closing state */
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingRestaurant(null);
    }, []);

    /** States to control the visibility of confirmation dialog */
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    /** State to store the user selected restaurant to delete */
    const [selectedRestaurantID, setSelectedRestaurantID] =
        useState<string>('');

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = useCallback(() => {
        if (selectedRestaurantID) {
            try {
                handleDeleteRestaurant(selectedRestaurantID);
                setIsDialogOpen(false);
                setSnackBarConfig({
                    open: true,
                    message: 'Restaurant deleted successfully',
                    variant: 'success',
                });
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Some error occurred, Try again later.',
                    variant: 'error',
                });
            }
        } else {
            setSelectedRestaurantID('');
        }
    }, [handleDeleteRestaurant, selectedRestaurantID]);

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    /**
     * Function to handle delete restaurant event.
     * @param restaurantId - restaurant id is used to delete the selected restaurant.
     */
    const handleOnDelete = useCallback((restaurantId: string) => {
        setIsDialogOpen(true);
        setSelectedRestaurantID(restaurantId);
    }, []);

    const navigate = useNavigate();

    /**
     * Function to handle click event on the restaurant card.
     * @param restaurantId - restaurant id of clicked restaurant.
     */
    const handleRestaurantClick = useCallback(
        (restaurantId: string) => {
            void navigate(ROUTES.MENU.replace(':restaurantId', restaurantId));
        },
        [navigate],
    );

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box width="100%">
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
                gap={theme.spacing(4)}
                alignItems="center"
                justifyContent="center"
                marginBlock={theme.spacing(8)}
            >
                {loading && (
                    <>
                        <LoadingCardSkeleton width={isMobile ? '40%' : '30%'} />
                        <LoadingCardSkeleton width={isMobile ? '40%' : '30%'} />
                        <LoadingCardSkeleton width={isMobile ? '40%' : '30%'} />
                        <LoadingCardSkeleton width={isMobile ? '40%' : '30%'} />
                        <LoadingCardSkeleton width={isMobile ? '40%' : '30%'} />
                        <LoadingCardSkeleton width={isMobile ? '40%' : '30%'} />
                    </>
                )}

                {!loading && (error || filteredRestaurants.length === 0) && (
                    <NullStateCard
                        title=""
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
                            data={restaurant}
                            userRole={userRole}
                            onEdit={(event) => {
                                event.stopPropagation();
                                handleOpenEditModal(restaurant);
                            }}
                            onDelete={(event) => {
                                event.stopPropagation();
                                handleOnDelete(restaurant.restaurantId);
                            }}
                            onClick={() =>
                                handleRestaurantClick(restaurant.restaurantId)
                            }
                            isClosed={isRestaurantClosed(
                                restaurant.openingTime,
                                restaurant.closingTime,
                            )}
                        />
                    ))}
            </Box>

            {/* Reusable form modal for both edit and add restaurant */}
            {ownerId && (
                <RestaurantModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    ownerId={ownerId}
                    restaurantToEdit={editingRestaurant}
                    onEdit={handleEditRestaurant}
                    onAdd={handleAddRestaurant}
                />
            )}
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description="Are you sure you want to Delete?"
            />
            <Snackbar
                open={snackbarConfig.open}
                autoHideDuration={1000}
                onClose={() =>
                    setSnackBarConfig({ ...snackbarConfig, open: false })
                }
                message={snackbarConfig.message}
                state={snackbarConfig.variant}
            />
        </Box>
    );
};
