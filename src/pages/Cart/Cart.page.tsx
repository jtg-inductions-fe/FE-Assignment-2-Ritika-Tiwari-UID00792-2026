import { useEffect, useState } from 'react';

import { CartCard } from 'components/CartCard/CartCard.component';

import { fetchCartData } from '@services';
import { Cart as CartData } from '@types';

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
        <CartCard
            restaurantData={data.restaurant}
            cartItem={data.items[0]}
            quantities={quantities}
            setQuantities={setQuantities}
            onRemoveItem={onRemoveItem}
        />
    );
};
