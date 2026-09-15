import { useState } from 'react';

import { MenuItemModal } from 'components/MenuItemModal/MenuItemModal.component';
import { useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    CardContent,
    Fab,
    Typography,
    useMediaQuery,
} from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    MenuCard,
    NullStateCard,
    ResponsiveContainer,
    Snackbar,
} from '@components';
import { useMenu, useRestaurant } from '@hooks';
import { theme } from '@theme';
import { Menu as MenuData } from '@types';

import { StyledImage, StyledRestaurantBanner } from './Menu.styles';

/**
 * Renders the Menu page.
 * @returns JSX.Element - The rendered Menu page.
 */
export const Menu = () => {
    const { restaurantId } = useParams();
    const { filteredRestaurants } = useRestaurant();

    // Find the restaurant data from the filtered restaurants.
    const restaurantData = filteredRestaurants.find(
        (restaurant) => restaurant.restaurantId === restaurantId,
    );
    const {
        menuLoading,
        menuError,
        userRole,
        filteredMenuItems,
        handleDeleteMenuItem,
        handleAddToCart,
        handleIncreaseStock,
        handleDecreaseStock,
    } = useMenu(restaurantId);

    /** State to control the Add and edit modals. */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /** State to control the editing mode of the modal. */
    const [editingMenuItem, setEditingMenuItem] = useState<MenuData | null>(
        null,
    );

    // Track the item Id currently staged for deletion.
    const [itemStagedForDeletion, setItemStagedForDeletion] = useState<
        string | null
    >(null);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>(
        'Some Error Occurred, Try later.',
    );
    const [snackbarState, setSnackbarState] = useState<
        'error' | 'success' | 'warning'
    >('error');

    /** State to control the quantity of a menu item. */
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    /** Handle Add restaurant modal open state. */
    const handleOpenAddModal = () => {
        setEditingMenuItem(null);
        setIsModalOpen(true);
    };

    /** Handle Edit restaurant modal open state. */
    const handleOpenEditModal = (menu: MenuData) => {
        setEditingMenuItem(menu);
        setIsModalOpen(true);
    };

    /** Handle edit and add restaurant modal closing state */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMenuItem(null);
    };

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = (confirmation: boolean) => {
        setIsDialogOpen(false);

        if (confirmation && itemStagedForDeletion) {
            try {
                // Execute the deletion only after confirmation
                handleDeleteMenuItem(itemStagedForDeletion);

                setIsSnackbarOpen(true);
                setSnackbarMessage('Item deleted successfully');
                setSnackbarState('success');
            } catch {
                setIsSnackbarOpen(true);
            } finally {
                setItemStagedForDeletion(null);
            }
        } else {
            setItemStagedForDeletion(null);
        }
    };

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = () => {
        setIsDialogOpen(false);
        setItemStagedForDeletion(null);
    };

    /**
     * Function to handle staging a menu item for deletion.
     * @param itemId - menu item id used to stage the deletion.
     * @returns void
     */
    const handleOnDelete = (itemId: string) => {
        setItemStagedForDeletion(itemId);
        setIsDialogOpen(true);
    };

    /** Handle on add to cart functionality.
     * @param itemId - menu item id used to add the item in the cart.
     * @param quantity - quantity of the selected item added in the cart.
     * @returns void
     */
    const handleOnAddToCart = (itemId: string, quantity: number) => {
        handleAddToCart(itemId, quantity);
        setIsSnackbarOpen(true);
        setSnackbarMessage('Item added to cart successfully');
        setSnackbarState('success');
    };

    /** Handle on increment the count of items in the stock.
     * @param itemId - id of the item whose stock quantity will be decreased.
     * @returns void
     */
    const handleOnIncreaseStock = (itemId: string) => {
        handleIncreaseStock(itemId);
    };
    /** Handle on decrement the count of items in the stock.
     * @param itemId - id of the item whose stock quantity will be decreased.
     * @returns void
     */
    const handleOnDecreaseStock = (itemId: string) => {
        handleDecreaseStock(itemId);
    };

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // handle the fallback state of the banner image.
    const [restImgSrc, setRestImgSrc] = useState(
        restaurantData?.imageUrl || fallBackImage,
    );
    return (
        <ResponsiveContainer>
            <StyledRestaurantBanner>
                <StyledImage
                    src={restImgSrc}
                    onError={() => {
                        if (restImgSrc !== fallBackImage) {
                            setRestImgSrc(fallBackImage);
                        }
                    }}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {restaurantData?.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {restaurantData?.description}
                    </Typography>
                    {userRole === 'owner' && !isMobile && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddModal}
                        >
                            <Typography variant="button" textTransform="none">
                                Add menu items
                            </Typography>
                        </Button>
                    )}
                </CardContent>
            </StyledRestaurantBanner>

            {/* Add Menu Item option will only show to owners */}
            {userRole === 'owner' && isMobile && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleOpenAddModal}
                >
                    <AddIcon />
                </Fab>
            )}

            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={theme.spacing(2)}
                alignItems="center"
                justifyContent="center"
                marginBlock={theme.spacing(3.2)}
            >
                {menuLoading && (
                    <>
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                        <LoadingCardSkeleton />
                    </>
                )}

                {!menuLoading &&
                    (menuError || filteredMenuItems.length === 0) && (
                        <NullStateCard
                            title=""
                            description={
                                menuError
                                    ? 'Failed to load data.'
                                    : 'No items found for this restaurant.'
                            }
                        />
                    )}
                {!menuLoading &&
                    !menuError &&
                    filteredMenuItems.map((menu) => (
                        <MenuCard
                            key={menu.itemId}
                            menu={menu}
                            userRole={userRole}
                            quantities={quantities}
                            setQuantities={setQuantities}
                            onEditClick={(event) => {
                                event.stopPropagation();
                                handleOpenEditModal(menu);
                            }}
                            onDelete={(event) => {
                                event.stopPropagation();
                                handleOnDelete(menu.itemId);
                            }}
                            onAddToCart={(event) => {
                                event.stopPropagation();
                                handleOnAddToCart(
                                    menu.itemId,
                                    quantities[menu.itemId],
                                );
                            }}
                            onDecreaseStock={(event) => {
                                event.stopPropagation();
                                handleOnDecreaseStock(menu.itemId);
                            }}
                            onIncreaseStock={(event) => {
                                event.stopPropagation();
                                handleOnIncreaseStock(menu.itemId);
                            }}
                        />
                    ))}
            </Box>

            {/* Reusable form modal for both edit and add menu item */}
            <MenuItemModal
                open={isModalOpen}
                onClose={handleCloseModal}
                restaurantId={restaurantId}
                MenuItemToEdit={editingMenuItem}
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
                message={snackbarMessage}
                state={snackbarState}
            />
        </ResponsiveContainer>
    );
};
