import { useState } from 'react';

import { CartCard } from 'components/CartCard/CartCard.component';
import { useCart } from 'hooks/useCart';

import {
    Box,
    Button,
    CardMedia,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
import { LoadingCardSkeleton, NullStateCard, Snackbar } from '@components';
import { theme } from '@theme';

export const Cart = () => {
    /** State to control the quantity of a menu item. */
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const {
        items,
        restaurant,
        billDetails,
        cartLoading,
        cartError,
        handleRemoveItemCompletely,
        handleClearCart,
    } = useCart();
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>(
        'Some Error Occurred, Try later.',
    );
    const [snackbarState, setSnackbarState] = useState<
        'error' | 'success' | 'warning'
    >('error');

    /**
     * Function to handle removing a cart item.
     * @param itemId - menu item id used to delete the item in the cart.
     * @returns void
     */
    const handleRemoveItem = (id: string) => {
        handleRemoveItemCompletely(id);
        setSnackbarMessage('Item is removed from the cart.');
        setSnackbarState('success');
        setIsSnackbarOpen(true);
    };
    const [imgSrc, setImgSrc] = useState(restaurant?.imageUrl || fallBackImage);
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={theme.spacing(4)}
            minHeight={'85'}
            width="100%"
            alignItems="start"
            marginBlock={theme.spacing(8)}
        >
            <Button variant="contained">
                <Typography variant="button" textTransform="none">
                    Add More Items
                </Typography>
            </Button>
            {cartLoading && (
                <>
                    <LoadingCardSkeleton />
                    <LoadingCardSkeleton />
                    <LoadingCardSkeleton />
                    <LoadingCardSkeleton />
                    <LoadingCardSkeleton />
                    <LoadingCardSkeleton />
                </>
            )}

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
            >
                {items.map((item) => (
                    <CartCard
                        key={item.menuItemId}
                        restaurantData={restaurant}
                        cartItem={item}
                        billDetails={billDetails}
                        quantities={quantities}
                        setQuantities={setQuantities}
                        onRemoveItem={() => {
                            handleRemoveItem(item.menuItemId);
                        }}
                    />
                ))}
            </Box>

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
                        <CardMedia
                            component="img"
                            image={imgSrc}
                            alt={restaurant?.name}
                            onError={() => {
                                if (imgSrc !== fallBackImage) {
                                    setImgSrc(fallBackImage);
                                }
                            }}
                            sx={{
                                width: 100,
                                height: 50,
                                objectFit: 'cover',
                                backgroundColor:
                                    theme.palette.background.default,
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
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            {billDetails.deliveryFee}
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
                            Grand Total
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            {billDetails.grandTotal}
                        </Typography>
                    </Box>
                </Box>
            )}
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
