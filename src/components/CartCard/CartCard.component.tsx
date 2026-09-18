import { CurrencyRupee } from '@mui/icons-material';
import { Typography } from '@mui/material';

import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { ItemQuantitySelector } from '@components';
import { useCart } from '@hooks';
import { theme } from '@theme';

import {
    InteractiveControlsGroup,
    ItemDetailsGroup,
    PriceWrapper,
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
}: CartItemProps) {
    const { handleRemoveFromCart } = useCart();

    return (
        <StyledCard>
            {/* Shows the details of the items. */}
            <ItemDetailsGroup>
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
                <StyledTitle variant="body2" fontWeight={500}>
                    {cartItem.name}
                </StyledTitle>
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
                        variant="body2"
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
