import { useState } from 'react';

export const useCart = () => {
    const [subTotals, setSubTotals] = useState<Record<string, number>>({});

    const calculateTotal = (
        price: number,
        quantity: number,
        menuItemId: string,
    ) => {
        const subTotal = quantity * price;
        setSubTotals((prev) => ({ ...prev, [menuItemId]: subTotal }));
        return subTotal;
    };

    const grandTotal = () => {
        const total = Object.values(subTotals).reduce(
            (sum, value) => sum + value,
            0,
        );
        return total;
    };

    return {
        calculateTotal,
        grandTotal,
    };
};
