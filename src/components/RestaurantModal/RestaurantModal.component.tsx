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

import { useRestaurant } from '@hooks';
import { Restaurant, Restaurant as RestaurantData } from '@types';

import { StyledModal } from './RestaurantModal.styles';
import { RestaurantModalProps } from './RestaurantModal.types';
import { RestaurantValidation } from './RestaurantModal.validations';

/**
 * RestaurantModal Component
 *
 * A modal dialog that handles both creating a new restaurant and editing an existing one.
 * It uses `react-hook-form` for form state management and validation, and Material UI for the UI components.
 * @props RestaurantModalProps - configuration properties to show a modal to add and edit the restaurant.
 *
 */
export const RestaurantModal = ({
    open,
    onClose,
    ownerId,
    restaurantToEdit,
}: RestaurantModalProps): JSX.Element => {
    // Determine if the modal is in edit mode based restaurant data to be edited
    const isEditMode = Boolean(restaurantToEdit);

    // fetching functions to handle add restaurant and edit restaurant functionality
    const { handleAddRestaurant, handleEditRestaurant } = useRestaurant();

    // Initialize form controls, error states, and validation tracking via react-hook-form
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<Restaurant>({
        defaultValues: {
            name: '',
            description: '',
            openingTime: '',
            closingTime: '',
            address: '',
            imageUrl: '',
            type: '',
        },
    });

    /**
     * Syncs form fields whenever the modal visibility changes or a different
     * restaurant is selected for editing.
     */
    useEffect(() => {
        if (restaurantToEdit) {
            // Populate fields with existing data for editing
            reset({
                name: restaurantToEdit.name,
                description: restaurantToEdit.description,
                openingTime: restaurantToEdit.openingTime,
                closingTime: restaurantToEdit.closingTime,
                address: restaurantToEdit.address,
                imageUrl: restaurantToEdit.imageUrl,
                type: restaurantToEdit.type,
            });
        } else {
            // Clear fields back to default states
            reset({
                name: '',
                description: '',
                openingTime: '',
                closingTime: '',
                address: '',
                imageUrl: '',
                type: '',
            });
        }
    }, [restaurantToEdit, reset, open]);

    /**
     * Handle the form submission.
     */
    const onSubmit = (data: Restaurant) => {
        if (isEditMode && restaurantToEdit) {
            // Merge new modifications into the existing restaurant object
            const updatedRestaurant: RestaurantData = {
                ...restaurantToEdit,
                ...data,
            };
            handleEditRestaurant(updatedRestaurant);
        } else {
            // Generate unique IDs and associate the owner for a brand new restaurant
            const newRestaurant: RestaurantData = {
                ...data,
                restaurantId: crypto.randomUUID(),
                ownerId,
            };
            handleAddRestaurant(newRestaurant);
        }
        // Clean up and close the modal after a successful edit or add restaurant.
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
            aria-labelledby="restaurant-modal-title"
        >
            <StyledModal>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography
                        id="restaurant-modal-title"
                        variant="h6"
                        fontWeight="bold"
                    >
                        {isEditMode
                            ? 'Edit Restaurant Details'
                            : 'Add New Restaurant'}
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
                    gap={2}
                    onSubmit={(e) => {
                        void handleSubmit(onSubmit)(e);
                    }}
                >
                    <Controller
                        name="name"
                        control={control}
                        rules={RestaurantValidation.name}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Restaurant Name"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="type"
                        control={control}
                        rules={RestaurantValidation.type}
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
                        rules={RestaurantValidation.description}
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

                    <Stack direction="row" gap={2}>
                        <Controller
                            name="openingTime"
                            control={control}
                            rules={RestaurantValidation.openingTime}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Opening Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.openingTime}
                                    helperText={errors.openingTime?.message}
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="closingTime"
                            control={control}
                            rules={RestaurantValidation.closingTime}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Closing Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.closingTime}
                                    helperText={errors.closingTime?.message}
                                    fullWidth
                                />
                            )}
                        />
                    </Stack>

                    <Controller
                        name="address"
                        control={control}
                        rules={RestaurantValidation.address}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street Address"
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="imageUrl"
                        control={control}
                        rules={RestaurantValidation.imageUrl}
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
                        gap={1.5}
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
                                  ? 'Save Changes'
                                  : 'Submit Restaurant'}
                        </Button>
                    </Stack>
                </Stack>
            </StyledModal>
        </Modal>
    );
};
