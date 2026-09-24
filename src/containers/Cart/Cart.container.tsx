import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { addNewOrder, setOrderLoading } from 'store/slices/Order/orderSlice';

import { CurrencyRupee } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import emptyCartImage from '@assets/images/empty-cart.webp';
import FALLBACK_IMAGE from '@assets/images/fallback-image.webp';
import {
    CartCard,
    ConfirmationDialog,
    LoadingCardSkeleton,
    NullStateCard,
    Snackbar,
} from '@components';
import { ORDER_STATUS } from '@constant';
import { useAuth, useCart, useRestaurant } from '@hooks';
import { ROUTES } from '@routes';
import { useAppDispatch, useAppSelector } from '@store';
import { theme } from '@theme';
import { CartItem, SnackbarConfig } from '@types';

import { ActionWrapper, EmptyCart, StyledCardMedia } from './Cart.styles';

/**
 * Renders Cart container.
 * Provide the business logic for the cart page like add to cart, remove items from cart, clear cart and adjust quantity and place order.
 * @returns JSX.Element - The rendered cart page components.
 */
export const Cart = () => {
    const navigate = useNavigate();
    const {
        items,
        restaurant,
        billDetails,
        cartLoading,
        cartError,
        handleRemoveFromCart,
        handleClearCart,
        handleAddToCart,
    } = useCart();

    const { fetchCurrentUser } = useAuth();
    const { isRestaurantClosed } = useRestaurant();
    // State to manage the configuration (visibility, message and state) of the snackbar.
    const [snackbarConfig, setSnackBarConfig] = useState<SnackbarConfig>({
        open: false,
        message: '',
        variant: 'success',
    });
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    // Handling of image load error and show the fallback image.
    const [imgSrc, setImgSrc] = useState(
        restaurant?.imageUrl || FALLBACK_IMAGE,
    );
    const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

    /** Function to handle the back navigation from cart page to menu page.
     */
    const handleBackNavigation = () => {
        void navigate(ROUTES.ROOT);
    };

    /**
     * Function to handle the remove items functionality from the cart
     * @param id - takes the id of the cart item.
     */
    const handleRemoveItem = useCallback(
        (id: string) => {
            try {
                handleRemoveFromCart(id);
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Failed to remove item.',
                    variant: 'error',
                });
            }
        },
        [handleRemoveFromCart],
    );

    /**
     * Handles the confirmation event from the confirmation dialog.
     */
    const handleSubmit = useCallback(() => {
        if (isPlacingOrder) {
            try {
                handlePlaceOrder();
                setSnackBarConfig({
                    open: true,
                    message: 'Ordered placed successfully.',
                    variant: 'success',
                });
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Some error occurred, Try again later.',
                    variant: 'error',
                });
            } finally {
                setIsDialogOpen(false);
                setIsPlacingOrder(false);
            }
        } else {
            try {
                handleClearCart();
                setSnackBarConfig({
                    open: true,
                    message: 'Cart cleared successfully.',
                    variant: 'success',
                });
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Some error occurred, Try again later.',
                    variant: 'error',
                });
            } finally {
                setIsDialogOpen(false);
            }
        }
    }, [handleClearCart, isPlacingOrder]);

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    const dispatch = useAppDispatch();
    const currentUser = fetchCurrentUser();
    const orderLoading = useAppSelector((state) => state.order.orderLoading);

    /**
     * Function to handle place order functionality from cart.
     * @param orderItems- takes the cart items and create the new order, for cart items.
     */
    const handlePlaceOrder = useCallback(() => {
        if (orderLoading) return;
        //Create the new order only if customer data and restaurant data is accurate.
        if (restaurant && currentUser) {
            // customer can place order only if the restaurant is opened.
            if (
                isRestaurantClosed(
                    restaurant.openingTime,
                    restaurant.closingTime,
                )
            ) {
                setSnackBarConfig({
                    open: true,
                    message: 'Restaurant is closed, please try again later.',
                    variant: 'error',
                });
                return;
            }
            dispatch(setOrderLoading(true));
            const newOrder = {
                orderId: crypto.randomUUID(),
                orderStatus: ORDER_STATUS[0],
                createdAt: new Date().toISOString(),
                customerDetails: {
                    ...currentUser,
                    address: '123 Maple Street, New York, NY 10001',
                },
                restaurantDetails: restaurant,
                items: items,
                billDetails: billDetails,
            };
            try {
                dispatch(addNewOrder(newOrder));
                handleClearCart();
                setSnackBarConfig({
                    open: true,
                    message: 'Order placed successfully.',
                    variant: 'success',
                });
                void navigate(ROUTES.ORDER_PORTAl);
            } catch {
                setSnackBarConfig({
                    open: true,
                    message: 'Order is not placed, try again later.',
                    variant: 'error',
                });
            } finally {
                dispatch(setOrderLoading(false));
            }
        }
    }, [
        dispatch,
        orderLoading,
        restaurant,
        currentUser,
        billDetails,
        navigate,
        handleClearCart,
        isRestaurantClosed,
    ]);

    //  Loads the current active restaurant's image when the restaurant change
    useEffect(() => {
        setImgSrc(restaurant?.imageUrl || FALLBACK_IMAGE);
    }, [restaurant?.imageUrl]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
        >
            {/* Top restaurant detail and go to menu action button wrapper */}
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                gap={theme.spacing(4)}
            >
                {/* Show the loading state of the cart page. */}
                {cartLoading && (
                    <>
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                        <LoadingCardSkeleton width="100%" />
                    </>
                )}

                {!cartLoading && items.length > 0 && (
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        marginTop={theme.spacing(8)}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={theme.spacing(1)}
                            divider={
                                <Divider orientation="vertical" flexItem />
                            }
                        >
                            <StyledCardMedia
                                component="img"
                                image={imgSrc}
                                onError={() => {
                                    if (imgSrc !== FALLBACK_IMAGE) {
                                        setImgSrc(FALLBACK_IMAGE);
                                    }
                                }}
                            />
                            <Typography variant="subtitle2">
                                {restaurant?.name}
                            </Typography>
                        </Stack>
                        <Button
                            variant="contained"
                            onClick={handleBackNavigation}
                        >
                            <Typography variant="button">
                                Add More Items
                            </Typography>
                        </Button>
                    </Box>
                )}

                {/* Cart card wrapper */}
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={theme.spacing(4)}
                    width="100%"
                    alignItems="center"
                    justifyContent="start"
                >
                    {!cartLoading && cartError && (
                        <NullStateCard description="Failed to load data." />
                    )}
                    {items.map((item: CartItem) => (
                        <CartCard
                            key={item.itemId}
                            item={item}
                            quantities={quantities}
                            setQuantities={setQuantities}
                            onAdd={() => handleAddToCart(item)}
                            onRemove={() => handleRemoveItem(item.itemId)}
                        />
                    ))}
                </Box>

                {/* Bill details of  order */}
                {!cartLoading && items.length > 0 && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={theme.spacing(4)}
                        width="100%"
                        marginTop={theme.spacing(8)}
                    >
                        <Typography variant="h6">Bill Details</Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                            >
                                Total cost of items
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <CurrencyRupee
                                    color="primary"
                                    fontSize="small"
                                />
                                <Typography
                                    variant="subtitle2"
                                    color={theme.palette.text.secondary}
                                >
                                    {billDetails.itemsSubtotal}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                            >
                                Total Items
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                            >
                                {billDetails.itemsCount}
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                            >
                                Delivery Charges
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <CurrencyRupee
                                    color="primary"
                                    fontSize="small"
                                />
                                <Typography
                                    variant="subtitle2"
                                    color={theme.palette.text.secondary}
                                >
                                    {billDetails.deliveryFee}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Typography
                                variant="subtitle2"
                                color={theme.palette.text.secondary}
                            >
                                Grand Total
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <CurrencyRupee
                                    color="primary"
                                    fontSize="small"
                                />
                                <Typography
                                    variant="subtitle2"
                                    color={theme.palette.text.secondary}
                                >
                                    {billDetails.grandTotal}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
            {!cartLoading && !cartError && items.length === 0 && (
                <EmptyCart>
                    <img
                        src={emptyCartImage}
                        alt="Cart is empty"
                        width={500}
                        height={500}
                    />
                    <Button variant="contained" onClick={handleBackNavigation}>
                        <Typography variant="button">Add Items</Typography>
                    </Button>
                </EmptyCart>
            )}
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation"
                description={
                    isPlacingOrder
                        ? 'Are you sure you want to place order?'
                        : 'Are you sure you clear the cart?'
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

            {/* Clear cart and place order actions button wrapper */}
            {items.length > 0 && !cartLoading && (
                <ActionWrapper
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    gap={theme.spacing(4)}
                    width="100%"
                    position="sticky"
                    bottom={0}
                >
                    <Button
                        variant="error"
                        onClick={() => {
                            setIsDialogOpen(true);
                        }}
                    >
                        <Typography variant="button">Clear cart</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setIsPlacingOrder(true);
                            setIsDialogOpen(true);
                        }}
                    >
                        <Typography variant="button">
                            {orderLoading ? 'processing...' : 'Proceed to buy'}
                        </Typography>
                    </Button>
                </ActionWrapper>
            )}
        </Box>
    );
};
