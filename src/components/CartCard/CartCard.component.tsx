import { useState } from 'react';

import { QuantityDropdown } from 'components/QuantityDropdown/QuantityDropdown.component';

import { CurrencyRupee } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Box,
    Button,
    Chip,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
import { theme } from '@theme';

import {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
    StyledTitle,
} from './CartCard.styles';
import { CartItemProps } from './CartCard.types';

/**
 * A cartItem card that displays the details of cartItem.
 * @param cartItemProps - the configuration property to render the card component for cartItem.
 * @returns The structured and styled cartItem card.
 */
export function CartCard({
    restaurantData,
    cartItem,
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
            <StyledCardMedia
                color={theme.palette.background.default}
                component="img"
                height="140"
                image={imgSrc}
                alt={restaurantData.name}
                onError={() => {
                    if (imgSrc !== fallBackImage) {
                        setImgSrc(fallBackImage);
                    }
                }}
            />
            <StyledCardContent>
                <StyledTitle gutterBottom variant="subtitle1">
                    {cartItem.name}
                </StyledTitle>
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
                        <QuantityDropdown
                            key={cartItem.cartItemId}
                            quantity={quantities[cartItem.cartItemId] ?? 1}
                            setQuantity={(newQty: number) => {
                                setQuantities((prev) => ({
                                    ...prev,
                                    [cartItem.cartItemId]: newQty,
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

                {/* Show the edit and delete buttons only to the owners */}
                <Box display="flex" gap={1} alignSelf="end" width="100%">
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onRemoveItem}
                    >
                        <Typography variant="button" textTransform="none">
                            Remove Item
                        </Typography>
                    </Button>
                </Box>
            </StyledCardContent>
        </StyledCard>
    );
}
