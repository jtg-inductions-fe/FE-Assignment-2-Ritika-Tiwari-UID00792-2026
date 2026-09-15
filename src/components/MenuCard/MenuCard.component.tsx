import { useState } from 'react';

import { QuantityDropdown } from 'components/QuantityDropdown/QuantityDropdown.component';

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
import { theme } from '@theme';

import {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
    StyledDescription,
    StyledTitle,
} from './MenuCard.styles';
import { MenuCardProps } from './MenuCard.types';

/**
 * A menu card that displays the details of menu.
 * @param MenuProps - the configuration property to render the card component for menu.
 * @returns The structured and styled menu card.
 */
export function MenuCard({
    menu,
    userRole,
    quantities,
    setQuantities,
    onEditClick,
    onDelete,
    onAddToCart,
    onIncreaseStock,
    onDecreaseStock,
}: MenuCardProps) {
    const [imgSrc, setImgSrc] = useState(menu.imageUrl || fallBackImage);
     // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <StyledCard>
            <StyledCardMedia
                color={
                    menu.stock === 0
                        ? theme.palette.action.disabledBackground
                        : theme.palette.background.default
                }
                component="img"
                height="140"
                image={imgSrc}
                alt={menu.name}
                onError={() => {
                    if (imgSrc !== fallBackImage) {
                        setImgSrc(fallBackImage);
                    }
                }}
            />
            <StyledCardContent>
                <StyledTitle gutterBottom variant="subtitle1">
                    {menu.name}
                </StyledTitle>
                <StyledDescription variant="body2" gutterBottom>
                    {menu.description}
                </StyledDescription>
                {/* Flexible Owner Controls */}
                {userRole === 'owner' ? (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        border="1px dashed #ccc"
                        borderRadius={theme.shape.borderRadius}
                        padding={theme.spacing(1)}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Stock Quantity:
                        </Typography>

                        {/* Decrement Button (-1) */}
                        <IconButton
                            size="small"
                            color="warning"
                            disabled={menu.stock <= 0}
                            onClick={onDecreaseStock}
                        >
                            <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>

                        {/* Display Current Stock Value */}
                        <Typography variant="body2" fontWeight="bold">
                            {menu.stock}
                        </Typography>

                        {/* Increment Button (+1) */}
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={onIncreaseStock}
                        >
                            <AddCircleOutlineIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                ) : (
                    <Stack minHeight={isMobile?100:'initial'} direction={isMobile ?"column":"row"} spacing={2} alignItems="start">
                        <Chip
                            icon={
                                menu.stock > 0 ? (
                                    <CheckCircleIcon />
                                ) : (
                                    <BlockIcon />
                                )
                            }
                            label={
                                menu.stock > 0
                                    ? `${menu.stock} in Stock`
                                    : `Out of Stock`
                            }
                            color={menu.stock > 0 ? 'success' : 'error'}
                        />
                        {menu.stock > 0 && (
                            <QuantityDropdown
                                key={menu.itemId}
                                quantity={quantities[menu.itemId] ?? 1}
                                setQuantity={(newQty: number) => {
                                    setQuantities((prev) => ({
                                        ...prev,
                                        [menu.itemId]: newQty,
                                    }));
                                }}
                                maxQuantity={menu.stock}
                            />
                        )}
                    </Stack>
                )}
                <Box
                    display="flex"
                    alignItems="center"
                    marginBlock={theme.spacing(1.6)}
                >
                    <CurrencyRupee color="primary" />
                    <Typography variant="h6">{menu.price}</Typography>
                </Box>

                {/* Show the edit and delete buttons only to the owners */}
                {userRole === 'owner' ? (
                    <Box display="flex" gap={1} alignSelf="end" width="100%">
                        <Button variant="text" onClick={onEditClick}>
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
                        disabled={menu.stock === 0}
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
