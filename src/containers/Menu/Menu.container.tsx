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

import FALLBACK_IMAGE from '@assets/images/fallback-image.webp';
import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    MenuCard,
    NullStateCard,
    Snackbar,
} from '@components';
import { useCart, useMenu, useRestaurant } from '@hooks';
import {
    addMenuItems,
    deleteMenuItems,
    editMenuItems,
    useAppDispatch,
} from '@store';
import { theme } from '@theme';
import { CartItem, Menu as MenuData, SnackbarConfig } from '@types';

import { StyledImage, StyledRestaurantBanner } from './Menu.styles';

/**
 * Menu Container
 * provides the business logic for menu page and menu-item state management, including functionality to add, edit, and delete items.
 * @returns The rendered Menu page components.
 */
export const Menu = () => {
    const dispatch = useAppDispatch();

    /** Function to handle adding a new menu item in the redux store.
     * @param data - new item's data
     * @returns void
     */
    const handleAddMenuItem = (data: MenuData) => {
        if (data) dispatch(addMenuItems(data));
    };

    /** Function to handle editing an existing MenuItem in the redux store.
     * @param data - updated item's data
     * @returns void
     */
    const handleEditMenuItem = (data: MenuData) => {
        if (data) dispatch(editMenuItems(data));
    };

    /** Function to handle deleting a MenuItem in the redux store.
     * @param itemId - item id of the item
     * @returns void
     */
    const handleDeleteMenuItem = (itemId: string) => {
        if (itemId) dispatch(deleteMenuItems(itemId));
    };

    const { restaurantId } = useParams();
    const { filteredRestaurants } = useRestaurant();

    const {
        menuLoading,
        menuError,
        userRole,
        filteredMenuItems,
        handleIncrease,
        handleDecrease,
    } = useMenu(restaurantId);

    // State to manage the configuration (visibility,message and state) of the snackbar.
    const [snackbarConfig, setSnackBarConfig] = useState<SnackbarConfig>({
        open: false,
        message: '',
        variant: 'success',
    });

    /** State to control the Add and edit modals. */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /** State to control the editing mode of the modal. */
    const [editingMenuItem, setEditingMenuItem] = useState<MenuData | null>(
        null,
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

    // Track the item Id currently Selected for deletion.
    const [itemSelectedForDeletion, setItemSelectedForDeletion] = useState<
        string | null
    >(null);

    const [currentItem, setCurrentItem] = useState<CartItem>();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    /** State for tracking the confirmation dialog , either it is for deleting the menu item or for switching the restaurant for placing the order in the cart. */
    const [dialogType, setIsDialogType] = useState<'delete' | 'change' | null>(
        null,
    );

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = () => {
        setIsDialogOpen(false);

        if (dialogType === 'delete' && itemSelectedForDeletion) {
            try {
                // Execute the deletion only after confirmation
                handleDeleteMenuItem(itemSelectedForDeletion);

                setSnackBarConfig({
                    open: true,
                    message: 'Item deleted successfully',
                    variant: 'success',
                });
                setItemSelectedForDeletion(null);
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Some error occurred, Try again later.',
                    variant: 'error',
                });
            }
        }
        if (dialogType === 'change') {
            try {
                handleClearCart();
                CreateNewCart();
                setSnackBarConfig({
                    open: true,
                    message:
                        'Restaurant changed successfully, now you can add more items to cart.',
                    variant: 'success',
                });
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Failed to change restaurant.',
                    variant: 'error',
                });
            } finally {
                setIsDialogType(null);
            }
        }
    };

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = () => {
        setIsDialogOpen(false);
        setItemSelectedForDeletion(null);
    };

    // Find the restaurant data from the filtered restaurants.
    const restaurantData = filteredRestaurants.find(
        (restaurant) => restaurant.restaurantId === restaurantId,
    );

    const {
        handleAddToCart,
        checkCurrentActiveRestaurant,
        handleClearCart,
        handleNewCart,
    } = useCart();

    /** Handle on add to cart functionality.
     * @param itemId - menu item id used to add the item in the cart.
     * @param quantity - quantity of the selected item added in the cart.
     * @returns void
     */
    const handleOnAddToCart = (item: CartItem) => {
        setCurrentItem(item);
        const restaurantStatus = checkCurrentActiveRestaurant(restaurantId);

        if (restaurantStatus === 'CONFLICT') {
            // Show the warning dialog if they are switching restaurants
            setIsDialogOpen(true);
            setIsDialogType('change');
            return;
        }

        if (restaurantStatus === 'EMPTY') {
            // Create the new cart when the cart is empty and add the current selected item to the cart.
            CreateNewCart();
        } else {
            // Add the item the existing cart.
            handleAddToCart(item);
        }

        setSnackBarConfig({
            open: true,
            message: 'Item added to cart.',
            variant: 'success',
        });
    };

    /**
     * Function to create the new cart in case of user wants to switch the restaurant or the cart is empty.
     */
    const CreateNewCart = () => {
        // Give the fallback values so undefined will not go to the cart.
        const menuItem: CartItem = {
            itemId: currentItem?.itemId ?? '',
            name: currentItem?.name ?? 'Unknown Item',
            imageUrl: currentItem?.imageUrl ?? 'default-placeholder.png',
            type: currentItem?.type ?? 'unknown',
            price: currentItem?.price ?? 0,
            stock: currentItem?.stock ?? 0,
            quantity: 1,
            itemSubtotal: currentItem?.price ?? 0,
        };

        // Build the new cart structure
        const newCart = {
            cartId: crypto.randomUUID(),
            restaurant: restaurantData ?? null,
            items: [menuItem],
            billDetails: {
                itemsSubtotal: menuItem.itemSubtotal,
                deliveryFee: 20,
                grandTotal: menuItem.itemSubtotal + 20,
                itemsCount: 1,
            },
        };
        handleNewCart(newCart);
    };

    /**
     * Function to handle selecting a menu item for deletion.
     * @param itemId - menu item id used to stage the deletion.
     * @returns void
     */
    const handleOnDelete = (itemId: string) => {
        setItemSelectedForDeletion(itemId);
        setIsDialogType('delete');
        setIsDialogOpen(true);
    };

    /** State to control the quantity of a menu item. */
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    /** Handle on increment the count of items in the stock.
     * @param itemId - id of the item whose stock quantity will be decreased.
     * @returns void
     */
    const handleOnIncreaseStock = (itemId: string) => {
        handleIncrease(itemId);
    };
    /** Handle on decrement the count of items in the stock.
     * @param itemId - id of the item whose stock quantity will be decreased.
     * @returns void
     */
    const handleOnDecreaseStock = (itemId: string) => {
        handleDecrease(itemId);
    };

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // handle the fallback state of the banner image.
    const [restImgSrc, setRestImgSrc] = useState(
        restaurantData?.imageUrl || FALLBACK_IMAGE,
    );

    return (
        <Box width="100%">
            <StyledRestaurantBanner>
                <StyledImage
                    src={restImgSrc}
                    onError={() => {
                        if (restImgSrc !== FALLBACK_IMAGE) {
                            setRestImgSrc(FALLBACK_IMAGE);
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
                            item={menuItem}
                            userRole={userRole}
                            quantities={quantities}
                            setQuantities={setQuantities}
                            onEdit={() => {
                                handleOpenEditModal(menuItem);
                            }}
                            onDelete={() => {
                                handleOnDelete(menuItem.itemId);
                            }}
                            onPrimaryAction={() => {
                                handleOnAddToCart({
                                    ...menuItem,
                                    quantity: 0,
                                    itemSubtotal: 0,
                                });
                            }}
                            onDecrease={() => {
                                handleOnDecreaseStock(menuItem.itemId);
                            }}
                            onIncrease={() => {
                                handleOnIncreaseStock(menuItem.itemId);
                            }}
                            confirmationType={dialogType}
                        />
                    ))}
            </Box>

            {/* Reusable form modal for both edit and add menu item */}
            <MenuItemModal
                open={isModalOpen}
                onClose={handleCloseModal}
                id={restaurantId}
                itemToEdit={editingMenuItem}
                onAdd={handleAddMenuItem}
                onEdit={handleEditMenuItem}
            />
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description={
                    dialogType === 'delete'
                        ? 'Are you sure you want to Delete?'
                        : "Are you sure you want to order from this and remove the previous restaurant's items from the cart?"
                }
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
