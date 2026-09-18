import { useState } from 'react';

import { ItemQuantitySelector } from 'components/ItemQuantitySelector/ItemQuantitySelector.component';

import { CurrencyRupee } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
    Box,
    Button,
    Chip,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { theme } from '@theme';

import {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
    StyledDescription,
    StyledImageIndicator,
    StyledTitle,
} from './MenuCard.styles';
import { MenuCardProps } from './MenuCard.types';

/**
 * A menu card that displays the details of menu.
 * @param MenuProps - the configuration property to render the card component for menu.
 * @returns The structured and styled menu card.
 */
export function MenuCard({
    menuItem,
    userRole,
    quantities,
    setQuantities,
    onEditClick,
    onDelete,
    onAddToCart,
    onIncreaseStock,
    onDecreaseStock,
}: MenuCardProps) {
    const [imgSrc, setImgSrc] = useState(menuItem.imageUrl || fallBackImage);
    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <StyledCard>
            <StyledCardMedia
                color={
                    menuItem.stock === 0
                        ? theme.palette.action.disabledBackground
                        : theme.palette.background.default
                }
                component="img"
                height="140"
                image={imgSrc}
                alt={menuItem.name}
                onError={() => {
                    if (imgSrc !== fallBackImage) {
                        setImgSrc(fallBackImage);
                    }
                }}
            />
            <StyledImageIndicator
                component="img"
                image={menuItem.type === 'veg' ? vegIndicator : nonVegIndicator}
                alt={menuItem.type}
            />
            <StyledCardContent>
                <StyledTitle gutterBottom variant="subtitle1">
                    {menuItem.name}
                </StyledTitle>
                <StyledDescription variant="body2" gutterBottom>
                    {menuItem.description}
                </StyledDescription>
                {/* owner controls on the stock quantity */}
                {userRole === 'owner' ? (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={theme.spacing(1)}
                        border="1px dashed #ccc"
                        borderRadius={theme.shape.borderRadius}
                        padding={theme.spacing(2)}
                        marginBlock={theme.spacing(4)}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Stock Quantity:
                        </Typography>

                        {/* Decrement stock quantity (-1) */}
                        <IconButton
                            size="small"
                            color="warning"
                            disabled={menuItem.stock <= 0}
                            onClick={onDecreaseStock}
                        >
                            <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>

                        {/* Display current stock value */}
                        <Typography variant="body2" fontWeight="bold">
                            {menuItem.stock}
                        </Typography>

                        {/* Increment stock quantity (+1) */}
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={onIncreaseStock}
                        >
                            <AddCircleOutlineIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                ) : (
                    <Stack
                        minHeight={isMobile ? 100 : 'initial'}
                        direction={isMobile ? 'column' : 'row'}
                        spacing={theme.spacing(4)}
                        alignItems="start"
                        marginTop={theme.spacing(4)}
                    >
                        <Chip
                            icon={
                                menuItem.stock ? (
                                    <CheckCircleIcon />
                                ) : (
                                    <BlockIcon />
                                )
                            }
                            label={
                                menuItem.stock
                                    ? `${menuItem.stock} in Stock`
                                    : `Out of Stock`
                            }
                            color={menuItem.stock > 0 ? 'success' : 'error'}
                        />
                        {menuItem.stock > 0 && (
                            <ItemQuantitySelector
                                key={menuItem.itemId}
                                quantity={quantities[menuItem.itemId] ?? 1}
                                setQuantity={(newQty: number) => {
                                    setQuantities((prev) => ({
                                        ...prev,
                                        [menuItem.itemId]: newQty,
                                    }));
                                }}
                                maxQuantity={menuItem.stock}
                            />
                        )}
                    </Stack>
                )}
                <Box
                    display="flex"
                    alignItems="center"
                    marginBlock={theme.spacing(4)}
                >
                    <CurrencyRupee color="primary" />
                    <Typography variant="h6">{menuItem.price}</Typography>
                </Box>

                {/* Show the edit and delete buttons only to the owners */}
                {userRole === 'owner' ? (
                    <Box
                        display="flex"
                        gap={theme.spacing(4)}
                        alignSelf="end"
                        width="100%"
                    >
                        <Button variant="outlined" onClick={onEditClick}>
                            <Typography variant="button" textTransform="none">
                                Edit
                            </Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={onDelete}
                        >
                            <Typography variant="button" textTransform="none">
                                Delete
                            </Typography>
                        </Button>
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        onClick={onAddToCart}
                        disabled={menuItem.stock === 0}
                    >
                        <Typography variant="button" textTransform="none">
                            Add to cart
                        </Typography>
                    </Button>
                )}
            </StyledCardContent>
        </StyledCard>
    );
}
