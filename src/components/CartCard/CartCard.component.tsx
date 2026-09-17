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
    PriceDisplayWrapper,
    StyledBox,
    StyledCard,
    StyledTitle,
} from './CartCard.styles';
import { CartItemProps } from './CartCard.types';

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
            {/* Left Group: Indicator -> Name -> Stock (Always stays left, never shifts order) */}
            <ItemDetailsGroup>
                {/* Absolute Close Action Icon */}
                <IconButton
                    size="small"
                    variant="error"
                    color="error"
                    disabled={cartItem.stock <= 0}
                    onClick={onRemoveItem}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
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

            {/* Right Group: Quantity over Price (Mobile) / Quantity beside Price (Tablet/Desktop) */}
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

                <PriceDisplayWrapper>
                    <CurrencyRupee color="primary" fontSize="small" />
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color={theme.palette.text.secondary}
                    >
                        {cartItem.itemSubtotal}
                    </Typography>
                </PriceDisplayWrapper>
            </InteractiveControlsGroup>
        </StyledCard>
    );
}
