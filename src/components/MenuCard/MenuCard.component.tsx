import { useState } from 'react';

import { ItemQuantitySelector } from 'components/ItemQuantitySelector/ItemQuantitySelector.component';
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
} from '@mui/material';

import FALLBACK_IMAGE from '@assets/images/fallback-image.webp';
import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { useCart } from '@hooks';
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
import { CurrencyRupee } from '@mui/icons-material';

/**
 * A menu card that displays the details of menu.
 * @param MenuProps - the configuration property to render the card component for menu.
 * @returns The structured and styled menu card.
 */
export function MenuCard({
    item,
    userRole,
    quantities,
    setQuantities,
    onEdit,
    onDelete,
    onPrimaryAction,
    onIncrease,
    onDecrease,
    confirmationType,
}: MenuCardProps) {

    // Returns true if screen width is smaller than the 'md' breakpoint.

    const [imgSrc, setImgSrc] = useState(item.imageUrl || FALLBACK_IMAGE);

    const { handleRemoveFromCart } = useCart();
    return (
        <StyledCard>
            <StyledCardMedia
                color={
                    item.stock === 0
                        ? theme.palette.action.disabledBackground
                        : theme.palette.background.default
                }
                component="img"
                height="140"
                image={imgSrc}
                alt={item.name}
                onError={() => {
                    if (imgSrc !== FALLBACK_IMAGE) {
                        setImgSrc(FALLBACK_IMAGE);
                    }
                }}
            />
            <StyledImageIndicator
                component="img"
                image={item.type === 'veg' ? vegIndicator : nonVegIndicator}
                alt={item.type}
            />
            <StyledCardContent>

                <StyledTitle gutterBottom variant="subtitle1">
                    {item.name}
                </StyledTitle>
                <StyledDescription variant="body2" gutterBottom>
                    {item.description}
                </StyledDescription>
                {/* owner controls on the stock quantity */}
                {userRole === 'owner' ? (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={theme.spacing(1)}
                        border={`1px dashed ${theme.palette.divider}`}
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
                            disabled={item.stock <= 0}
                            onClick={onDecrease}
                        >
                            <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>

                        {/* Display current stock value */}
                        <Typography variant="body2" fontWeight="bold">
                            {item.stock}
                        </Typography>

                        {/* Increment stock quantity (+1) */}

                        {/* Decrement stock quantity (-1) */}
                        <IconButton
                            size="small"
                            color="warning"
                            disabled={item.stock <= 0}
                            onClick={onDecrease}
                        >
                            <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>

                        {/* Display current stock value */}
                        <Typography variant="body2" fontWeight="bold">
                            {item.stock}
                        </Typography>

                        {/* Increment stock quantity (+1) */}
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={onIncrease}
                        >
                            <AddCircleOutlineIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                ) : (
                    <Chip
                        icon={
                            item.stock > 0 ? (
                                <CheckCircleIcon />
                            ) : (
                                <BlockIcon />
                            )
                        }
                        label={
                            item.stock > 0
                                ? `${item.stock} in Stock`
                                : `Out of Stock`
                        }
                        color={item.stock > 0 ? 'success' : 'error'}
                    />
                )}
                <Box
                    display="flex"
                    alignItems="center"
                    marginBlock={theme.spacing(4)}
                >
                    <CurrencyRupee color="primary" />
                    <Typography variant="h6">{item.price}</Typography>
                </Box>

                {/* Show the edit and delete buttons only to the owners */}
                {userRole === 'owner' ? (
                    <Box
                        display="flex"
                        gap={theme.spacing(4)}
                        alignSelf="end"
                        width="100%"
                    >
                        <Button variant="text" onClick={onEdit}>
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
                ) :

                    /* For customers: swap between ItemQuantitySelector and Add to Cart button */
                    quantities[item.itemId] > 0 &&
                        confirmationType !== 'change' ? (
                        <ItemQuantitySelector
                            key={item.itemId}
                            quantity={quantities[item.itemId]}
                            setQuantity={(newQty: number) => {
                                setQuantities((prev) => ({
                                    ...prev,
                                    [item.itemId]: newQty,
                                }));
                            }}
                            maxQuantity={item.stock}
                            onIncrease={() =>
                                onPrimaryAction
                            }
                            onDecrease={() => handleRemoveFromCart(item.itemId)}
                        />
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setQuantities((prev) => ({
                                    ...prev,
                                    [item.itemId]: 1,
                                }));
                                onPrimaryAction();
                            }}
                            disabled={item.stock === 0}
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
