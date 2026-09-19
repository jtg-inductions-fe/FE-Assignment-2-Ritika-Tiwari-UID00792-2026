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
import { Restaurant, Restaurant as RestaurantData } from '@types';

import { StyledModal } from './RestaurantModal.styles';
import { RestaurantModalProps } from './RestaurantModal.types';
import { restaurantValidation } from './RestaurantModal.validations';

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
    onEdit,
    onAdd,
}: RestaurantModalProps): JSX.Element => {
    // Determine if the modal is in edit mode based restaurant data to be edited
    const isEditMode = Boolean(restaurantToEdit);

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
        values: restaurantToEdit || {
            restaurantId: '',
            ownerId: ownerId,
            name: '',
            description: '',
            openingTime: '',
            closingTime: '',
            address: '',
            imageUrl: '',
            type: 'veg',
        },
    });

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
            onEdit(updatedRestaurant);
        } else {
            // Generate unique IDs and associate the owner for a brand new restaurant
            const newRestaurant: RestaurantData = {
                ...data,
                restaurantId: crypto.randomUUID(),
                ownerId,
            };
            onAdd(newRestaurant);
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
                        color={theme.palette.text.primary}
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
                    gap={theme.spacing(4)}
                    onSubmit={(e) => {
                        void handleSubmit(onSubmit)(e);
                    }}
                >
                    <FormTextField
                        name="name"
                        control={control}
                        rules={restaurantValidation.name}
                        label="Restaurant Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        autoComplete="name"
                        fullWidth
                    />

                    <FormTextField
                        name="type"
                        control={control}
                        rules={restaurantValidation.type}
                        select
                        label="Cuisine Type"
                        error={!!errors.type}
                        helperText={errors.type?.message}
                        autoComplete="type"
                        fullWidth
                    >
                        <MenuItem value="veg">Veg</MenuItem>
                        <MenuItem value="non-veg">Non-veg</MenuItem>
                    </FormTextField>

                    <FormTextField
                        name="description"
                        control={control}
                        rules={restaurantValidation.description}
                        label="Description"
                        multiline
                        rows={2}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        autoComplete="description"
                        fullWidth
                    />

                    <Stack direction="row" gap={theme.spacing(4)}>
                        <FormTextField
                            name="openingTime"
                            control={control}
                            rules={restaurantValidation.openingTime}
                            label="Opening Time"
                            type="time"
                            slotProps={{ inputLabel: { shrink: true } }}
                            error={!!errors.openingTime}
                            helperText={errors.openingTime?.message}
                            autoComplete="opening time"
                            fullWidth
                        />

                        <FormTextField
                            name="closingTime"
                            control={control}
                            rules={restaurantValidation.closingTime}
                            label="Closing Time"
                            type="time"
                            slotProps={{ inputLabel: { shrink: true } }}
                            error={!!errors.closingTime}
                            helperText={errors.closingTime?.message}
                            autoComplete="closing time"
                            fullWidth
                        />
                    </Stack>

                    <FormTextField
                        name="address"
                        control={control}
                        rules={restaurantValidation.address}
                        label="Street Address"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        autoComplete="address"
                        fullWidth
                    />

                    <FormTextField
                        name="imageUrl"
                        control={control}
                        rules={restaurantValidation.imageUrl}
                        label="Display Image URL"
                        error={!!errors.imageUrl}
                        helperText={errors.imageUrl?.message}
                        autoComplete="image url"
                        fullWidth
                    />

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        gap={theme.spacing(4)}
                        mt={theme.spacing(4)}
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
