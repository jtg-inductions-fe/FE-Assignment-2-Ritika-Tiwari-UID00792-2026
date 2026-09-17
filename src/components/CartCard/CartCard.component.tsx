import { useEffect } from 'react';

import { CurrencyRupee } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CardMedia, Chip, IconButton, Typography } from '@mui/material';

import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { ItemQuantitySelector } from '@components';
import { useCart, useMenu } from '@hooks';
import { theme } from '@theme';

import { StyledCard } from './CartCard.styles';
import { CartItemProps } from './CartCard.types';

export function CartCard({
    restaurantData,
    cartItem,
    quantities,
    setQuantities,
    onRemoveItem,
}: CartItemProps) {
    const { handleAddToCart } = useMenu(restaurantData?.restaurantId);
    const { handleRemoveFromCart } = useCart();
    const currentQuantity =
        quantities[cartItem.menuItemId] ?? cartItem.quantity ?? 1;

    useEffect(() => {
        if (cartItem) {
            setQuantities((prev) => ({
                ...prev,
                [cartItem.menuItemId]: cartItem.quantity,
            }));
        }
    }, [cartItem,cartItem?.menuItemId, cartItem?.quantity, setQuantities]);

    const handleQuantityChange = (newQty: number) => {
        if (newQty <= 0) {
            handleRemoveFromCart(cartItem.menuItemId);
            return;
        }

        setQuantities((prev) => ({
            ...prev,
            [cartItem.menuItemId]: newQty,
        }));
        handleAddToCart(cartItem.menuItemId, newQty);
    };

    return (
        <StyledCard>
            <IconButton
                size="small"
                color="error"
                disabled={cartItem.stock <= 0}
                onClick={onRemoveItem}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={theme.spacing(2)}
            >
                <CardMedia
                    component="img"
                    height={20}
                    image={
                        cartItem.type === 'veg' ? vegIndicator : nonVegIndicator
                    }
                    alt={cartItem.type}
                    sx={{
                        width: 20,
                        height: 20,
                        objectFit: 'cover',
                        backgroundColor: theme.palette.background.default,
                    }}
                />
                <Typography>{cartItem.name}</Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={theme.spacing(2)}
            >
                <Chip
                    icon={
                        cartItem.stock > 0 ? <CheckCircleIcon /> : <BlockIcon />
                    }
                    label={
                        cartItem.stock > 0
                            ? `${cartItem.stock} in Stock`
                            : `Out of Stock`
                    }
                    color={cartItem.stock > 0 ? 'success' : 'error'}
                />
                {cartItem.stock > 0 && (
                    <ItemQuantitySelector
                        key={cartItem.menuItemId}
                        quantity={currentQuantity}
                        setQuantity={handleQuantityChange}
                        maxQuantity={cartItem.stock}
                    />
                )}
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
                <CurrencyRupee color="primary" fontSize="small" />
                <Typography
                    variant="subtitle2"
                    color={theme.palette.text.secondary}
                >
                    {cartItem.itemSubtotal}
                </Typography>
            </Box>
        </StyledCard>
    );
}
