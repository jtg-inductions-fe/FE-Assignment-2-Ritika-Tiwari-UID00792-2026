import { useState } from 'react';

import { CartCard } from 'components/CartCard/CartCard.component';

import { Box, Typography } from '@mui/material';
import { theme } from '@theme';

import { StyledBox } from './Cart.styles';
import { useCart } from 'hooks/useCart';

export const Cart = () => {
    /** State to control the quantity of a menu item. */
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const { items, restaurant, billDetails, removeFromCart } = useCart();

    const handleRemoveItem = (id: string) => {
        removeFromCart(id);
    };
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={theme.spacing(8)}
                marginBlock={theme.spacing(8)}
            >
                {items.map((item) => (
                    <CartCard
                        key={item.menuItemId}
                        restaurantData={restaurant}
                        cartItem={item}
                        billDetails={billDetails}
                        quantities={quantities}
                        setQuantities={setQuantities}
                        onRemoveItem={() => {
                            handleRemoveItem(item.menuItemId);
                        }}
                    />
                ))}
            </Box>

            <StyledBox
                display="flex"
                flexDirection="column"
                gap={theme.spacing(8)}
                marginTop={theme.spacing(8)}
            >
                <Typography variant="h6">
                    You are ordering from {restaurant?.name}
                </Typography>
            </StyledBox>
        </>
    );
};
