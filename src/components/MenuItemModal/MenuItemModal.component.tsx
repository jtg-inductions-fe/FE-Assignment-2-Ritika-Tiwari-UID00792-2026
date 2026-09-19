import { JSX } from 'react';

import { FormTextField } from 'components/FormTextField/FormTextField.component';
import { useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    IconButton,
    MenuItem,
    Modal,
    Stack,
    Typography,
} from '@mui/material';

import { theme } from '@theme';
import { Menu } from '@types';

import { StyledModal } from './MenuItemModal.styles';
import { MenuItemModalProps } from './MenuItemModal.types';
import { menuItemValidation } from './MenuItemModal.validations';

/**
 * MenuItemModal Component
 *
 * A modal dialog that handles both creating a new menu item and editing an existing one.
 * It uses `react-hook-form` for form state management and validation, and Material UI for the UI components.
 * @props MenuItemModalProps - configuration properties to show a modal to add and edit the MenuItem.
 *
 */
export const MenuItemModal = ({
    open,
    onClose,
    id,
    itemToEdit,
    onEdit,
    onAdd,
}: MenuItemModalProps): JSX.Element => {
    // Initialize form controls, error states, and validation tracking via react-hook-form
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<Menu>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            stock: 0,
            imageUrl: '',
            type: 'veg',
        },
        values: itemToEdit || {
            restaurantId: id,
            itemId: '',
            name: '',
            description: '',
            price: 0,
            stock: 0,
            imageUrl: '',
            type: 'veg',
        },
    });

    // Determine if the modal is in edit mode based MenuItem data to be edited
    const isEditMode = Boolean(itemToEdit);

    /**
     * Handle the form submission.
     */
    const onSubmit = (data: Menu) => {
        if (isEditMode && itemToEdit) {
            // Merge new modifications into the existing menu item object
            const updatedMenuItem: Menu = {
                ...itemToEdit,
                ...data,
            };
            onEdit(updatedMenuItem);
        } else {
            // Generate unique IDs and associate the owner for a brand new menu item
            const newMenuItem: Menu = {
                ...data,
                itemId: crypto.randomUUID(),
                restaurantId: id,
            };
            onAdd(newMenuItem);
        }

        // Clean up and close the modal after a successful edit or add MenuItem.
        handleCancel();
    };

    /**
     * Resets form values and closes the modal view.
     */
    const handleCancel = () => {
        reset();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleCancel}
            aria-labelledby="MenuItem-modal-title"
        >
            <StyledModal>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography
                        id="MenuItem-modal-title"
                        variant="h6"
                        fontWeight="bold"
                    >
                        {isEditMode ? 'Edit Item Details' : 'Add Item'}
                    </Typography>
                    <IconButton
                        onClick={handleCancel}
                        aria-label="close modal"
                        edge="end"
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Stack
                    component="form"
                    gap={theme.spacing(4)}
                    onSubmit={(e) => {
                        void handleSubmit(onSubmit)(e);
                    }}
                >
                    <FormTextField
                        name="name"
                        control={control}
                        rules={menuItemValidation.name}
                        label="Item Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                    />

                    <FormTextField
                        name="type"
                        control={control}
                        rules={menuItemValidation.type}
                        select
                        label="Cuisine Type"
                        error={!!errors.type}
                        helperText={errors.type?.message}
                        fullWidth
                    >
                        <MenuItem value="veg">Veg</MenuItem>
                        <MenuItem value="non-veg">Non-veg</MenuItem>
                    </FormTextField>

                    <FormTextField
                        name="description"
                        control={control}
                        rules={menuItemValidation.description}
                        label="Description"
                        multiline
                        rows={2}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        fullWidth
                    />

                    <Stack direction="row" gap={theme.spacing(2)}>
                        <FormTextField
                            name="price"
                            control={control}
                            rules={menuItemValidation.price}
                            label="Price"
                            type="number"
                            slotProps={{
                                htmlInput: { min: 0 },
                            }}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            fullWidth
                            onChange={(e) => {
                                const val = e.target.value;
                                return val === '' ? '' : Number(val);
                            }}
                        />
                        <FormTextField
                            name="stock"
                            control={control}
                            rules={menuItemValidation.stockQuantity}
                            label="Stock quantity"
                            type="number"
                            slotProps={{
                                htmlInput: { min: 0 },
                            }}
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                            fullWidth
                            onChange={(e) => {
                                const val = e.target.value;
                                return val === '' ? '' : Number(val);
                            }}
                        />
                    </Stack>
                    <FormTextField
                        name="imageUrl"
                        control={control}
                        rules={menuItemValidation.imageUrl}
                        label="Display Image URL"
                        error={!!errors.imageUrl}
                        helperText={errors.imageUrl?.message}
                        fullWidth
                    />

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        gap={theme.spacing(4)}
                        mt={1}
                    >
                        <Button
                            onClick={handleCancel}
                            color="inherit"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {(() => {
                                if (isSubmitting) return 'Submitting...';
                                if (isEditMode) return 'Save';
                                return 'Submit';
                            })()}
                        </Button>
                    </Stack>
                </Stack>
            </StyledModal>
        </Modal>
    );
};
