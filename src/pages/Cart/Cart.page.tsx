import { useEffect, useState } from 'react';

import { CartCard } from 'components/CartCard/CartCard.component';

import { Box, Typography } from '@mui/material';

import { fetchCartData } from '@services';
import { theme } from '@theme';
import { Cart as CartData } from '@types';

import { StyledBox } from './Cart.styles';

export const Cart = () => {
    /** State to control the quantity of a menu item. */
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const [data, setData] = useState<CartData>();

    //  Fetch data only when restaurantId or dispatch changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartData = await fetchCartData();
                setData(cartData);
            } catch {
                // console.log(err);
            }
        };
        void fetchData();
    }, []);
    if (!data) return;

    const onRemoveItem = () => {};
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={theme.spacing(8)}
                marginBlock={theme.spacing(8)}
            >
                {data.items.map((item) => (
                    <CartCard
                    key={item.menuItemId}
                        restaurantData={data.restaurant}
                        cartItem={item}
                        billDetails={data.billDetails}
                        quantities={quantities}
                        setQuantities={setQuantities}
                        onRemoveItem={onRemoveItem}
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
                    You are ordering from {data.restaurant.name}
                </Typography>
            </StyledBox>
        </>
    );
};
