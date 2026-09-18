import { useEffect, useState } from 'react';

import { CartCard } from 'components/CartCard/CartCard.component';
import { useNavigate } from 'react-router-dom';

import { CurrencyRupee } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
import { LoadingCardSkeleton, NullStateCard, Snackbar } from '@components';
import { useCart } from '@hooks';
import { theme } from '@theme';
import { CartItem } from '@types';

import { StyledCardMedia } from './Cart.styles';

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
    const [imgSrc, setImgSrc] = useState(fallBackImage);

    // Setting the fallback image if the restaurant image has not found.
    useEffect(() => {
        if (restaurant?.imageUrl) {
            setImgSrc(restaurant.imageUrl);
        }
    }, [restaurant]);

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
        setIsSnackbarOpen(true);
        setSnackbarMessage('Item added to cart successfully');
        setSnackbarState('success');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={theme.spacing(4)}
            minHeight={'85vh'}
            width="100%"
            alignItems="start"
            marginBlock={theme.spacing(8)}
        >
            <Button variant="contained" onClick={handleBackNavigation}>
                <Typography variant="button" textTransform="none">
                    Add More Items
                </Typography>
            </Button>

            {!cartLoading && (cartError || items.length === 0) && (
                <NullStateCard
                    title=""
                    description={
                        cartError ? 'Failed to load data.' : 'Cart is empty.'
                    }
                />
            )}

            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={theme.spacing(4)}
                width="100%"
            >
                {/* Show the loading state of the cart page. */}
                {cartLoading && (
                    <>
                        <LoadingCardSkeleton />
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
            {items.length > 0 && (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={theme.spacing(4)}
                    width="100%"
                    marginTop={theme.spacing(8)}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={theme.spacing(2)}
                        divider={<Divider orientation="vertical" flexItem />}
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
                            <CurrencyRupee color="primary" fontSize="small" />
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
                            <CurrencyRupee color="primary" fontSize="small" />
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

            {items.length > 0 && (
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    gap={theme.spacing(4)}
                    width="100%"
                    position="sticky"
                    bottom={32}
                >
                    <Button variant="error" onClick={handleClearCart}>
                        <Typography variant="button" textTransform="none">
                            Clear cart
                        </Typography>
                    </Button>
                    <Button variant="contained">
                        <Typography variant="button" textTransform="none">
                            Proceed to pay
                        </Typography>
                    </Button>
                </Box>
            )}

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={() => setIsSnackbarOpen(false)}
                message={snackbarMessage}
                state={snackbarState}
            />
        </Box>
    );
};
