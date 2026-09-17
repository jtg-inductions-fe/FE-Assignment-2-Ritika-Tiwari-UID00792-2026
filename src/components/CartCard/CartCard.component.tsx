import { useState } from 'react';

import { CurrencyRupee } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    CardMedia,
    Chip,
    Divider,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { ItemQuantitySelector } from '@components';
import { theme } from '@theme';

import { StyledBox, StyledCard } from './CartCard.styles';
import { CartItemProps } from './CartCard.types';

/**
 * A cartItem card that displays the details of cartItem.
 * @param cartItemProps - the configuration property to render the card component for cartItem.
 * @returns The structured and styled cartItem card.
 */
export function CartCard({
    restaurantData,
    cartItem,
    billDetails,
    quantities,
    setQuantities,
    onRemoveItem,
}: CartItemProps) {
    const [imgSrc, setImgSrc] = useState(
        restaurantData.imageUrl || fallBackImage,
    );
    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <StyledCard>
            <IconButton
                variant="error"
                size="small"
                color="error"
                disabled={cartItem.stock <= 0}
                onClick={onRemoveItem}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
            <StyledBox>
                <Stack
                    direction="row"
                    spacing={theme.spacing(4)}
                    alignItems="center"
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <CardMedia
                        component="img"
                        image={imgSrc}
                        alt={restaurantData.name}
                        onError={() => {
                            if (imgSrc !== fallBackImage) {
                                setImgSrc(fallBackImage);
                            }
                        }}
                        sx={{
                            width: 100,
                            height: 50,
                            objectFit: 'cover',
                            backgroundColor: theme.palette.background.default,
                        }}
                    />
                    <Typography variant="subtitle2">
                        {restaurantData.name}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    spacing={theme.spacing(4)}
                    alignItems="center"
                >
                    <CardMedia
                        component="img"
                        height={20}
                        image={
                            cartItem.type === 'veg'
                                ? vegIndicator
                                : nonVegIndicator
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
                    <Stack
                        minHeight={isMobile ? 100 : 'initial'}
                        direction={isMobile ? 'column' : 'row'}
                        spacing={2}
                        alignItems="start"
                    >
                        <Chip
                            icon={
                                cartItem.stock > 0 ? (
                                    <CheckCircleIcon />
                                ) : (
                                    <BlockIcon />
                                )
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
                                quantity={quantities[cartItem.menuItemId] ?? 1}
                                setQuantity={(newQty: number) => {
                                    setQuantities((prev) => ({
                                        ...prev,
                                        [cartItem.menuItemId]: newQty,
                                    }));
                                }}
                                maxQuantity={cartItem.stock}
                            />
                        )}
                    </Stack>
                    <Box
                        display="flex"
                        alignItems="center"
                        marginBlock={theme.spacing(1.6)}
                    >
                        <CurrencyRupee color="primary" />
                        <Typography variant="h6">{cartItem.price}</Typography>
                    </Box>
                </Stack>

                <Typography variant="subtitle1">Bill Details</Typography>
                <Stack
                    direction="column"
                    spacing={theme.spacing(4)}
                    divider={<Divider orientation="horizontal" flexItem />}
                >
                    <Stack
                        direction="row"
                        spacing={theme.spacing(4)}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            Item Total
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color={theme.palette.text.secondary}
                        >
                            {billDetails.itemsSubtotal}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={theme.spacing(4)}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography variant="subtitle2">To Pay</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            marginBlock={theme.spacing(1.6)}
                        >
                            <CurrencyRupee color="primary" />
                            <Typography variant="h6">
                                {cartItem.price}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </StyledBox>
        </StyledCard>
    );
}
