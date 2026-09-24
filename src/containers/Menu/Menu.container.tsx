import { useCallback, useState } from 'react';

import { MenuItemModal } from 'components/MenuItemModal/MenuItemModal.component';
import { useParams } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    CardContent,
    Chip,
    Fab,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';

import FALLBACK_IMAGE from '@assets/images/fallback-image.webp';
import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    MenuCard,
    NullStateCard,
    SearchBar,
    Snackbar,
} from '@components';
import { DELIVERY_FEE } from '@constant';
import { useCart, useMenu, useRestaurant } from '@hooks';
import {
    addMenuItems,
    deleteMenuItems,
    editMenuItems,
    useAppDispatch,
} from '@store';
import { theme } from '@theme';
import {
    CartItem,
    DialogType,
    Menu as MenuData,
    RestaurantStatus,
    SnackbarConfig,
} from '@types';
import { formatUTCToLocal12h } from '@utils';

import {
    FilterContainer,
    OuterContainer,
    StyledImage,
    StyledRestaurantBanner,
} from './Menu.styles';

/**
 * Menu Container
 * provides the business logic for menu page and menu-item state management, including functionality to add, edit, and delete items.
 * @returns The rendered Menu page components.
 */
export const Menu = () => {
    const dispatch = useAppDispatch();
    const { restaurantId } = useParams();
    const { filteredRestaurants } = useRestaurant();

    const {
        menuLoading,
        menuError,
        userRole,
        filteredMenuItems,
        handleIncrease,
        handleDecrease,
        handleFilterToggle,
        setSearchTerm,
        activeCategory,
    } = useMenu(restaurantId);

    /** State for tracking the confirmation dialog , either it is for deleting the menu item or for switching the restaurant for placing the order in the cart. */
    const {
        handleAddToCart,
        checkCurrentActiveRestaurant,
        handleClearCart,
        handleNewCart,
        handleRemoveFromCart,
    } = useCart();

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    const [currentItem, setCurrentItem] = useState<CartItem>();

    // Track the item Id currently Selected for deletion.
    const [itemSelectedForDeletion, setItemSelectedForDeletion] = useState<
        string | null
    >(null);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const [dialogType, setDialogType] = useState<DialogType>(null);

    /** State to control the quantity of a menu item. */
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    // Find the restaurant data from the filtered restaurants.
    const restaurantData = filteredRestaurants.find(
        (restaurant) => restaurant.restaurantId === restaurantId,
    );
    // handle the fallback state of the banner image.
    const [restImgSrc, setRestImgSrc] = useState(
        restaurantData?.imageUrl || FALLBACK_IMAGE,
    );

    /** Function to handle adding a new menu item in the redux store.
     * @param data - new item's data
     * @returns void
     */
    const handleAddMenuItem = useCallback(
        (data: MenuData) => {
            if (data) dispatch(addMenuItems(data));
             setSnackBarConfig({
                        open: true,
                        message: 'Item added to menu successfully.',
                        variant: 'success',
                    });
        },
        [dispatch],
    );

    /** Function to handle editing an existing MenuItem in the redux store.
     * @param data - updated item's data
     * @returns void
     */
    const handleEditMenuItem = useCallback(
        (data: MenuData) => {
            if (data) dispatch(editMenuItems(data));
             setSnackBarConfig({
                        open: true,
                        message: 'Item edited successfully.',
                        variant: 'success',
                    });
        },
        [dispatch],
    );

    /** Function to handle deleting a MenuItem in the redux store.
     * @param itemId - item id of the item
     * @returns void
     */
    const handleDeleteMenuItem = useCallback(
        (itemId: string) => {
            if (itemId) dispatch(deleteMenuItems(itemId));
        },
        [dispatch],
    );

    /** Handle Add restaurant modal open state. */
    const handleOpenAddModal = useCallback(() => {
        setEditingMenuItem(null);
        setIsModalOpen(true);
    }, []);

    /** Handle Edit restaurant modal open state. */
    const handleOpenEditModal = useCallback((menu: MenuData) => {
        setEditingMenuItem(menu);
        setIsModalOpen(true);
    }, []);

    /** Handle edit and add restaurant modal closing state */
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingMenuItem(null);
    }, []);

    /**
     * Function to create the new cart in case of user wants to switch the restaurant or the cart is empty.
     */
    const createNewCart = useCallback(
        (item: CartItem) => {
            if (!item) return;

            const menuItem: CartItem = {
                itemId: item?.itemId,
                name: item?.name,
                imageUrl: item?.imageUrl,
                dietaryCategory: item?.dietaryCategory,
                price: item?.price,
                stock: item?.stock,
                quantity: 1,
                itemSubtotal: item?.price,
            };

            // Build the new cart structure
            const newCart = {
                cartId: crypto.randomUUID(),
                restaurant: restaurantData ?? null,
                items: [menuItem],
                billDetails: {
                    itemsSubtotal: menuItem.itemSubtotal,
                    deliveryFee: DELIVERY_FEE,
                    grandTotal: menuItem.itemSubtotal + DELIVERY_FEE,
                    itemsCount: 1,
                },
            };
            try {
                // Add the new cart.
                handleNewCart(newCart);
                setSnackBarConfig({
                    open: true,
                    message: 'New cart created successfully.',
                    variant: 'success',
                });
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Some error occurred, try again later.',
                    variant: 'error',
                });
            }
        },
        [handleNewCart, restaurantData],
    );

    /**
     * Handles the confirmation event from the confirmation dialog.
     */
    const handleSubmit = useCallback(() => {
        setIsDialogOpen(false);

        if (dialogType === 'DELETE' && itemSelectedForDeletion) {
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
            } finally {
                setDialogType(null);
            }
        }
        if (dialogType === 'CHANGE') {
            try {
                handleClearCart();
                if (currentItem) {
                    createNewCart(currentItem);
                }
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
                setDialogType(null);
            }
        }
    }, [
        dialogType,
        itemSelectedForDeletion,
        handleDeleteMenuItem,
        handleClearCart,
        currentItem,
        createNewCart,
    ]);

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = useCallback(() => {
        setIsDialogOpen(false);
        setDialogType(null);
        setItemSelectedForDeletion(null);
    }, []);

    /** Handle on add to cart functionality.
     * @param itemId - menu item id used to add the item in the cart.
     * @param quantity - quantity of the selected item added in the cart.
     * @returns void
     */
    const handleOnAddToCart = useCallback(
        (item: CartItem) => {
            const newItem = item;
            setCurrentItem(newItem);
            const restaurantStatus: RestaurantStatus =
                checkCurrentActiveRestaurant(restaurantId);
            if (restaurantStatus === 'CONFLICT') {
                // Show the warning dialog if they are switching restaurants
                setIsDialogOpen(true);
                setDialogType('CHANGE');
                return;
            }

            if (restaurantStatus === 'EMPTY') {
                // Create the new cart when the cart is empty and add the current selected item to the cart.
                createNewCart(item);
            } else {
                try {
                    handleAddToCart(item);
                    setSnackBarConfig({
                        open: true,
                        message: 'Item added to cart Successfully',
                        variant: 'success',
                    });
                } catch {
                    setSnackBarConfig({
                        open: true,
                        message: 'Some error occurred, try again later.',
                        variant: 'error',
                    });
                }
            }
        },
        [
            restaurantId,
            checkCurrentActiveRestaurant,
            createNewCart,
            handleAddToCart,
        ],
    );

    /**
     * Function to handle selecting a menu item for deletion.
     * @param itemId - menu item id used to stage the deletion.
     * @returns void
     */
    const handleOnDelete = useCallback((itemId: string) => {
        setItemSelectedForDeletion(itemId);
        setDialogType('DELETE');
        setIsDialogOpen(true);
    }, []);

    /** Handle on increment the count of items in the stock.
     * @param itemId - id of the item whose stock quantity will be decreased.
     * @returns void
     */
    const handleOnIncreaseStock = useCallback(
        (itemId: string) => {
            handleIncrease(itemId);
        },
        [handleIncrease],
    );

    /** Handle on decrement the count of items in the stock.
     * @param itemId - id of the item whose stock quantity will be decreased.
     * @returns void
     */
    const handleOnDecreaseStock = useCallback(
        (itemId: string) => {
            handleDecrease(itemId);
        },
        [handleDecrease],
    );
    return (
        <Box width="100%">
            <StyledRestaurantBanner>
                <StyledImage
                    src={restImgSrc}
                    alt={restaurantData?.name}
                    onError={() => {
                        if (restImgSrc !== FALLBACK_IMAGE) {
                            setRestImgSrc(FALLBACK_IMAGE);
                        }
                    }}
                    fetchPriority="high"
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {restaurantData?.name}
                    </Typography>
                    <Typography variant="body2" component="p" gutterBottom>
                        {restaurantData?.description}
                    </Typography>
                    <Stack
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={theme.spacing(1)}
                        marginBlock={theme.spacing(4)}
                    >
                        <AccessTimeIcon fontSize="small" color="primary" />
                        <Typography
                            variant="body2"
                            color={theme.palette.text.primary}
                        >
                            {formatUTCToLocal12h(restaurantData?.openingTime)} –{' '}
                            {formatUTCToLocal12h(restaurantData?.closingTime)}
                        </Typography>
                    </Stack>
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

            <OuterContainer>
                <SearchBar onSearch={setSearchTerm} />
                <FilterContainer
                    aria-label="Menu Item category filters"
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
                justifyContent="start"
                marginBlock={theme.spacing(8)}
            >
                {menuLoading && (
                    <>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <LoadingCardSkeleton key={i} variant="responsive" />
                        ))}
                    </>
                )}

                {!menuLoading &&
                    (menuError || filteredMenuItems.length === 0) && (
                        <NullStateCard
                            description={
                                menuError
                                    ? 'Failed to load data.'
                                    : 'No Items found, matching your criteria.'
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
                            onRemove={() =>
                                handleRemoveFromCart(menuItem.itemId)
                            }
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
                title="Confirmation"
                description={
                    dialogType === 'DELETE'
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
