import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Typography } from '@mui/material';

import { theme } from '@theme';

import { ItemQuantitySelectorProps } from './ItemQuantitySelector.types';

/**
 * Quantity Selector Component
 *
 * A chip-styled selector used to increase or decrease the quantity of a menu item.
 * @props QuantityDropdownProps - configuration properties to manage the quantity.
 * @return - a rendered quantity controller with plus and minus buttons.
 */
export const ItemQuantitySelector = ({
    quantity,
    setQuantity,
    maxQuantity = 10,
    onIncrease,
    onDecrease,
}: ItemQuantitySelectorProps) => {
    const handleIncrement = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
        onIncrease();
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
        onDecrease();
    };

    return (
        <Box
            display="inline-flex"
            alignItems="center"
            border={`1px solid ${theme.palette.primary.light}`}
            borderRadius={theme.shape.borderRadius}
        >
            <IconButton
                size="small"
                onClick={handleDecrement}
                disabled={quantity === 0}
                aria-label="decrease quantity"
            >
                <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography variant="body2" fontWeight="medium" component="span">
                {quantity}
            </Typography>

            <IconButton
                size="small"
                onClick={handleIncrement}
                disabled={quantity >= maxQuantity}
                aria-label="increase quantity"
            >
                <AddIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};
