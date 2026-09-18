import { CurrencyRupee } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Chip, IconButton, Typography } from '@mui/material';

import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { ItemQuantitySelector } from '@components';
import { useCart } from '@hooks';
import { theme } from '@theme';

import {
    InteractiveControlsGroup,
    ItemDetailsGroup,
    PriceWrapper,
    StyledBox,
    StyledCard,
    StyledTitle,
} from './CartCard.styles';
import { CartItemProps } from './CartCard.types';

/**
 * A cart card that displays the details of cart.
 * @param cartItemProps - the configuration property to render the card component for cart.
 * @returns The structured and styled cart card.
 */
export function CartCard({
    cartItem,
    quantities,
    setQuantities,
    onAddToCart,
    onRemoveItem,
}: CartItemProps) {
    const { handleRemoveFromCart } = useCart();

    return (
        <StyledCard>
            {/* Shows the details of the items. */}
            <ItemDetailsGroup>
                {/* this icon button is used to remove the item. */}
                <IconButton
                    size="small"
                    variant="error"
                    color="error"
                    disabled={cartItem.stock <= 0}
                    onClick={onRemoveItem}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                {/* Image to indicate the type of the food item. */}
                <img
                    src={
                        cartItem.type === 'veg' ? vegIndicator : nonVegIndicator
                    }
                    alt={cartItem.type}
                    style={{
                        width: 20,
                        height: 20,
                        objectFit: 'cover',
                        backgroundColor: theme.palette.background.default,
                    }}
                />
                <StyledBox>
                    <StyledTitle variant="body1" fontWeight={500}>
                        {cartItem.name}
                    </StyledTitle>
                    <Chip
                        size="small"
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
                                : 'Out of Stock'
                        }
                        color={cartItem.stock > 0 ? 'success' : 'error'}
                    />
                </StyledBox>
            </ItemDetailsGroup>

            {/* Shows the cart item quantity selector and sub total of the item. */}
            <InteractiveControlsGroup>
                {cartItem.stock > 0 && (
                    <ItemQuantitySelector
                        key={cartItem.itemId}
                        quantity={
                            quantities[cartItem.itemId] ?? cartItem.quantity
                        }
                        setQuantity={(newQty: number) => {
                            setQuantities((prev) => ({
                                ...prev,
                                [cartItem.itemId]: newQty,
                            }));
                        }}
                        maxQuantity={cartItem.stock}
                        onIncrease={() =>
                            onAddToCart({
                                stopPropagation: () => {},
                            } as React.MouseEvent)
                        }
                        onDecrease={() => handleRemoveFromCart(cartItem.itemId)}
                    />
                )}

                <PriceWrapper>
                    <CurrencyRupee color="primary" fontSize="small" />
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color={theme.palette.text.secondary}
                    >
                        {cartItem.itemSubtotal}
                    </Typography>
                </PriceWrapper>
            </InteractiveControlsGroup>
        </StyledCard>
    );
}
