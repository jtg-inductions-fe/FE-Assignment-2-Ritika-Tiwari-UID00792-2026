import { useCallback, useState } from 'react';

import { CartCard } from 'components/CartCard/CartCard.component';
import { useNavigate } from 'react-router-dom';

import { CurrencyRupee } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import emptyCartImage from '@assets/images/empty-cart.webp';
import fallBackImage from '@assets/images/fallback-image.webp';
import {
    ConfirmationDialog,
    LoadingCardSkeleton,
    NullStateCard,
    Snackbar,
} from '@components';
import { HEADER_HEIGHT } from '@constant';
import { useCart } from '@hooks';
import { ROUTES } from '@routes';
import { theme } from '@theme';
import { CartItem } from '@types';

import { ActionWrapper, EmptyCart, StyledCardMedia } from './Cart.styles';

/**
 * Renders the cart page.
 * @returns JSX.Element - The rendered cart page.
 */
export const Cart = () => {
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const {
        items,
        restaurant,
        billDetails,
        cartLoading,
        cartError,
        handleRemoveItemCompletely,
        handleClearCart,
        handleAddToCart,
    } = useCart();

    //State of snackbar to show the conditional message and state of snackbar.
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>(
        'Some Error Occurred, Try later.',
    );
    const [snackbarState, setSnackbarState] = useState<
        'error' | 'success' | 'warning'
    >('error');

    // Handling of image load error and show the fallback image.
    const [imgSrc, setImgSrc] = useState(restaurant?.imageUrl || fallBackImage);

    /** Function to handle the back navigation from cart page to menu page.
     */
    const handleBackNavigation = () => {
        void navigate(-1);
    };

    /**
     * Function to handle the remove items functionality from the cart
     * @param id - takes the id of the cart item.
     */
    const handleRemoveItem = (id: string) => {
        try {
            handleRemoveItemCompletely(id);
            setSnackbarMessage('Item is removed from the cart.');
            setSnackbarState('success');
            setIsSnackbarOpen(true);
        } catch {
            setSnackbarMessage('Failed to remove item.');
            setSnackbarState('error');
            setIsSnackbarOpen(true);
        }
    };

    /** Handle on add to cart functionality.
     * @param itemId - menu item id used to add the item in the cart.
     * @param quantity - quantity of the selected item added in the cart.
     * @returns void
     */
    const handleOnAddToCart = (item: CartItem) => {
        handleAddToCart(item);
    };

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = useCallback(
        (confirmation: boolean) => {
            setIsDialogOpen(false);
            if (confirmation) {
                try {
                    handleClearCart();
                    setIsSnackbarOpen(true);
                    setSnackbarMessage('Cart Cleared successfully.');
                    setSnackbarState('success');
                } catch {
                    setIsSnackbarOpen(true);
                } finally {
                    setIsDialogOpen(false);
                }
            } else {
                setIsDialogOpen(false);
            }
        },
        [handleClearCart],
    );

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    /**
     * Function to handle place order functionality from cart.
     */
    const handlePlaceOrder = () => {
        handleClearCart();
        void navigate(ROUTES.ORDER_PORTAl);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight={`calc(100vh - ${HEADER_HEIGHT}px)`}
            width="100%"
            alignItems="center"
            justifyContent="space-between"
        >
            {/* Top restaurant detail and go to menu action button wrapper */}
            <Box display="flex" flexDirection="column" gap={theme.spacing(4)}>
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
                                alt={restaurant?.name}
                                onError={() => {
                                    if (imgSrc !== fallBackImage) {
                                        setImgSrc(fallBackImage);
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
                            <Typography variant="button" textTransform="none">
                                Add More Items
                            </Typography>
                        </Button>
                    </Box>
                )}

                {!cartLoading && cartError && (
                    <NullStateCard
                        title=""
                        description="Failed to load data."
                    />
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
                    {/* Show the loading state of the cart page. */}
                    {cartLoading && (
                        <>
                            <LoadingCardSkeleton />
                            <LoadingCardSkeleton />
                            <LoadingCardSkeleton />
                            <LoadingCardSkeleton />
                        </>
                    )}
                    {items.map((item) => (
                        <CartCard
                            key={item.itemId}
                            restaurantData={restaurant}
                            cartItem={item}
                            billDetails={billDetails}
                            quantities={quantities}
                            setQuantities={setQuantities}
                            onAddToCart={(event) => {
                                event.stopPropagation();
                                handleOnAddToCart(item);
                            }}
                            onRemoveItem={() => handleRemoveItem(item.itemId)}
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
                {!cartLoading && items.length === 0 && (
                    <EmptyCart marginTop={theme.spacing(16)}>
                        <img
                            src={emptyCartImage}
                            alt="Cart is empty"
                            width={300}
                            height={300}
                        />
                        <Button
                            variant="contained"
                            onClick={handleBackNavigation}
                        >
                            <Typography variant="button" textTransform="none">
                                Add Items
                            </Typography>
                        </Button>
                    </EmptyCart>
                )}
            </Box>
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description="Are you sure you clear the cart?"
            />
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={() => setIsSnackbarOpen(false)}
                message={snackbarMessage}
                state={snackbarState}
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
                        <Typography variant="button" textTransform="none">
                            Clear cart
                        </Typography>
                    </Button>
                    <Button variant="contained" onClick={handlePlaceOrder}>
                        <Typography variant="button" textTransform="none">
                            Proceed to pay
                        </Typography>
                    </Button>
                </ActionWrapper>
            )}
        </Box>
    );
};
