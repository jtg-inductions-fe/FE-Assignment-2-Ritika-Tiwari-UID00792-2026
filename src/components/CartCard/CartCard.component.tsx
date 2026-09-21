import { CurrencyRupee } from '@mui/icons-material';
import { Typography } from '@mui/material';

import nonVegIndicator from '@assets/images/non-veg-indicator.webp';
import vegIndicator from '@assets/images/veg-indicator.webp';
import { ItemQuantitySelector } from '@components';
import { theme } from '@theme';

import {
    InteractiveControlsGroup,
    ItemDetailsGroup,
    PriceWrapper,
    StyledCard,
    StyledImage,
    StyledTitle,
} from './CartCard.styles';
import { CartItemProps } from './CartCard.types';

/**
 * A cart card that displays the details of cart.
 * @param cartItemProps - the configuration property to render the card component for cart.
 * @returns The structured and styled cart card.
 */
export function CartCard({
    item,
    quantities,
    setQuantities,
    onAdd,
    onRemove,
}: CartItemProps) {
    return (
        <StyledCard>
            {/* Shows the details of the items. */}
            <ItemDetailsGroup>
                {/* Image to indicate the type of the food item. */}
                <StyledImage
                    src={
                        item.dietaryCategory === 'veg'
                            ? vegIndicator
                            : nonVegIndicator
                    }
                    alt={item.dietaryCategory}
                />
                <StyledTitle variant="body2" fontWeight={500}>
                    {item.name}
                </StyledTitle>
            </ItemDetailsGroup>

            {/* Shows the cart item quantity selector and sub total of the item. */}
            <InteractiveControlsGroup>
                {item.stock && (
                    <ItemQuantitySelector
                        key={item.itemId}
                        itemId={item.itemId}
                        quantity={quantities[item.itemId] ?? item.quantity}
                        setQuantities={setQuantities}
                        maxQuantity={item.stock}
                        onIncrease={onAdd}
                        onDecrease={onRemove}
                    />
                )}

                <PriceWrapper>
                    <CurrencyRupee color="primary" fontSize="small" />
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color={theme.palette.text.secondary}
                    >
                        {item.itemSubtotal}
                    </Typography>
                </PriceWrapper>
            </InteractiveControlsGroup>
        </StyledCard>
    );
}
