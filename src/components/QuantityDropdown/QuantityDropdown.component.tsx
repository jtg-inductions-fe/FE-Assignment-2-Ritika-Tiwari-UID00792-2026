import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { QuantityDropdownProps } from './QuantityDropDown.types';

/**
 * Quantity Dropdown Component
 *
 * A dropdown used to choose the quantity of the menu item.
 * @props QuantityDropdownProps - configuration properties to show a dropdown to choose the quantity of the menu item.
 * @return - a rendered dropdown to choose the menu item quantity.
 */
export const QuantityDropdown = ({
    quantity,
    setQuantity,
    maxQuantity = 10,
}: QuantityDropdownProps) => {
    // Generate an array of numbers from 1 to maxQuantity
    const qtyOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

    return (
        <Box minWidth={80}>
            <FormControl size="small" fullWidth>
                <InputLabel id="quantity-select-label">Qty</InputLabel>
                <Select
                    labelId="quantity-select-label"
                    id="quantity-select"
                    value={quantity}
                    label="Qty"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                >
                    {qtyOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
