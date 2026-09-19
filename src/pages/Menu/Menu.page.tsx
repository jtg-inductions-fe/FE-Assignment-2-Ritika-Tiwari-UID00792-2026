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

import fALLBACK_IMAGE from '@assets/images/fallback-image.webp';
import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    MenuCard,
    NullStateCard,
    Snackbar,
} from '@components';
import { useMenu, useRestaurant } from '@hooks';
import { theme } from '@theme';
import { Menu as MenuData, SnackbarConfig } from '@types';

import { StyledImage, StyledRestaurantBanner } from './Menu.styles';

/**
 * Renders the Menu page.
 * @returns JSX.Element - The rendered Menu page.
 */
export const Menu = () => {
    const { restaurantId } = useParams();
    const { filteredRestaurants } = useRestaurant();

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

    // Track the item Id currently Selected for deletion.
    const [itemSelectedForDeletion, setItemSelectedForDeletion] = useState<
        string | null
    >(null);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    // State to manage the configuration (visibility,message and state) of the snackbar.
    const [snackbarConfig, setSnackBarConfig] = useState<SnackbarConfig>({
        open: false,
        message: '',
        variant: 'success',
    });

    /** State to control the quantity of a menu item. */
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    // Find the restaurant data from the filtered restaurants.
    const restaurantData = filteredRestaurants.find(
        (restaurant) => restaurant.restaurantId === restaurantId,
    );

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
    const handleSubmit = () => {
        setIsDialogOpen(false);

        if (itemSelectedForDeletion) {
            try {
                // Execute the deletion only after confirmation
                handleDeleteMenuItem(itemSelectedForDeletion);
                setSnackBarConfig({
                    open: true,
                    message: 'Item deleted successfully',
                    variant: 'success',
                });
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Some error occurred, Try again later.',
                    variant: 'error',
                });
            } finally {
                setItemSelectedForDeletion(null);
            }
        } else {
            setItemSelectedForDeletion(null);
        }
    };

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = () => {
        setIsDialogOpen(false);
        setItemSelectedForDeletion(null);
    };

    /**
     * Function to handle staging a menu item for deletion.
     * @param itemId - menu item id used to stage the deletion.
     * @returns void
     */
    const handleOnDelete = (itemId: string) => {
        setItemSelectedForDeletion(itemId);
        setIsDialogOpen(true);
    };

    /** Handle on add to cart functionality.
     * @param itemId - menu item id used to add the item in the cart.
     * @param quantity - quantity of the selected item added in the cart.
     * @returns void
     */
    const handleOnAddToCart = (itemId: string, quantity: number) => {
        handleAddToCart(itemId, quantity);
        setSnackBarConfig({
            open: true,
            message: 'Item added to cart successfully',
            variant: 'success',
        });
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
        restaurantData?.imageUrl || fALLBACK_IMAGE,
    );
    return (
        <Box width="100%">
            <StyledRestaurantBanner>
                <StyledImage
                    src={restImgSrc}
                    onError={() => {
                        if (restImgSrc !== fALLBACK_IMAGE) {
                            setRestImgSrc(fALLBACK_IMAGE);
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
                            <Typography variant="button">
                                Add menu item
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
                gap={theme.spacing(4)}
                alignItems="center"
                justifyContent="center"
                marginBlock={theme.spacing(8)}
            >
                {menuLoading && (
                    <>
                        <LoadingCardSkeleton
                            width={isMobile ? '40%' : '100%'}
                        />
                        <LoadingCardSkeleton
                            width={isMobile ? '40%' : '100%'}
                        />
                        <LoadingCardSkeleton
                            width={isMobile ? '40%' : '100%'}
                        />
                        <LoadingCardSkeleton
                            width={isMobile ? '40%' : '100%'}
                        />
                        <LoadingCardSkeleton
                            width={isMobile ? '40%' : '100%'}
                        />
                        <LoadingCardSkeleton
                            width={isMobile ? '40%' : '100%'}
                        />
                    </>
                )}

                {!menuLoading &&
                    (menuError || filteredMenuItems.length === 0) && (
                        <NullStateCard
                            description={
                                menuError
                                    ? 'Failed to load data.'
                                    : 'No items found for this restaurant.'
                            }
                        />
                    )}
                {!menuLoading &&
                    !menuError &&
                    filteredMenuItems.map((menuItem) => (
                        <MenuCard
                            key={menuItem.itemId}
                            menuItem={menuItem}
                            userRole={userRole}
                            quantities={quantities}
                            setQuantities={setQuantities}
                            onEdit={() => {
                                handleOpenEditModal(menuItem);
                            }}
                            onDelete={() => {
                                handleOnDelete(menuItem.itemId);
                            }}
                            onAddToCart={() => {
                                handleOnAddToCart(
                                    menuItem.itemId,
                                    quantities[menuItem.itemId],
                                );
                            }}
                            onDecrease={() => {
                                handleOnDecreaseStock(menuItem.itemId);
                            }}
                            onIncrease={() => {
                                handleOnIncreaseStock(menuItem.itemId);
                            }}
                        />
                    ))}
            </Box>

            {/* Reusable form modal for both edit and add menu item */}
            <MenuItemModal
                open={isModalOpen}
                onClose={handleCloseModal}
                restaurantId={restaurantId}
                menuItemToEdit={editingMenuItem}
            />
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description="Are you sure you want to Delete?"
            />
            <Snackbar
                open={snackbarConfig.open}
                autoHideDuration={2000}
                onClose={() =>
                    setSnackBarConfig({ ...snackbarConfig, open: false })
                }
                message={snackbarConfig.message}
                state={snackbarConfig.variant}
            />
        </Box>
    );
};
