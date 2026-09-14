import { JSX, useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    IconButton,
    MenuItem,
    Modal,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { useMenu } from '@hooks';
import { theme } from '@theme';
import { Menu } from '@types';

import { StyledModal } from './MenuItemModal.styles';
import { MenuItemModalProps } from './MenuItemModal.types';
import { menuItemValidation } from './MenuItemModal.validations';

/**
 * MenuItemModal Component
 *
 * A modal dialog that handles both creating a new MenuItem and editing an existing one.
 * It uses `react-hook-form` for form state management and validation, and Material UI for the UI components.
 * @props MenuItemModalProps - configuration properties to show a modal to add and edit the MenuItem.
 *
 */
export const MenuItemModal = ({
    open,
    onClose,
    restaurantId,
    MenuItemToEdit,
}: MenuItemModalProps): JSX.Element => {
    // Determine if the modal is in edit mode based MenuItem data to be edited
    const isEditMode = Boolean(MenuItemToEdit);

    // fetching functions to handle add MenuItem and edit MenuItem functionality
    const { handleAddMenuItem, handleEditMenuItem } = useMenu(restaurantId);

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
            type: '',
        },
    });

    /**
     * Syncs form fields whenever the modal visibility changes or a different
     * MenuItem is selected for editing.
     */
    useEffect(() => {
        if (MenuItemToEdit) {
            // Populate fields with existing data for editing
            reset({
                name: MenuItemToEdit.name,
                description: MenuItemToEdit.description,
                price: MenuItemToEdit.price,
                stock: MenuItemToEdit.stock,
                imageUrl: MenuItemToEdit.imageUrl,
                type: MenuItemToEdit.type,
            });
        } else {
            // Clear fields back to default states
            reset({
                name: '',
                description: '',
                price: 0,
                stock: 0,
                imageUrl: '',
                type: '',
            });
        }
    }, [MenuItemToEdit, reset, open]);

    /**
     * Handle the form submission.
     */
    const onSubmit = (data: Menu) => {
        if (isEditMode && MenuItemToEdit) {
            // Merge new modifications into the existing MenuItem object
            const updatedMenuItem: Menu = {
                ...MenuItemToEdit,
                ...data,
            };
            handleEditMenuItem(updatedMenuItem);
        } else {
            // Generate unique IDs and associate the owner for a brand new MenuItem
            const newMenuItem: Menu = {
                ...data,
                itemId: crypto.randomUUID(),
                restaurantId,
            };
            handleAddMenuItem(newMenuItem);
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
                        {isEditMode
                            ? 'Edit MenuItem Details'
                            : 'Add New MenuItem'}
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
                    gap={theme.spacing(2)}
                    onSubmit={(e) => {
                        void handleSubmit(onSubmit)(e);
                    }}
                >
                    <Controller
                        name="name"
                        control={control}
                        rules={menuItemValidation.name}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="MenuItem Name"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="type"
                        control={control}
                        rules={menuItemValidation.type}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Cuisine Type"
                                error={!!errors.type}
                                helperText={errors.type?.message}
                                fullWidth
                            >
                                <MenuItem value="veg">Veg</MenuItem>
                                <MenuItem value="non-veg">Non-veg</MenuItem>
                            </TextField>
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        rules={menuItemValidation.description}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                multiline
                                rows={2}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Stack direction="row" gap={theme.spacing(2)}>
                        <Controller
                            name="price"
                            control={control}
                            rules={menuItemValidation.openingTime}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Price"
                                    type="number"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="stock"
                            control={control}
                            rules={menuItemValidation.closingTime}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Stock quantity"
                                    type="number"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.stock}
                                    helperText={errors.stock?.message}
                                    fullWidth
                                />
                            )}
                        />
                    </Stack>

                    <Controller
                        name="imageUrl"
                        control={control}
                        rules={menuItemValidation.imageUrl}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Display Image URL"
                                error={!!errors.imageUrl}
                                helperText={errors.imageUrl?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        gap={theme.spacing(1.6)}
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
                            {isSubmitting
                                ? 'Submitting...'
                                : isEditMode
                                  ? 'Save'
                                  : 'Submit'}
                        </Button>
                    </Stack>
                </Stack>
            </StyledModal>
        </Modal>
    );
};
