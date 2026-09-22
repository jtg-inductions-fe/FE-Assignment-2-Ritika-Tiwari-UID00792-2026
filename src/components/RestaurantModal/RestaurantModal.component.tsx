import { JSX } from 'react';
import React from 'react';

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

import { RESTAURANT_FORM_DEFAULT_VALUES } from '@constant';
import { theme } from '@theme';
import { Restaurant, Restaurant as RestaurantData } from '@types';
import { formatLocalToUTCSubmit, formatUTCToLocalInput } from '@utils';

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
export const RestaurantModal = React.memo(function RestaurantModal({
    open,
    onClose,
    ownerId,
    restaurantToEdit,
    onEdit,
    onAdd,
}: RestaurantModalProps): JSX.Element {
    // Prepare the incoming values for the form by cleaning up UTC string dependencies
    const formValues = restaurantToEdit
        ? {
              ...restaurantToEdit,
              openingTime: formatUTCToLocalInput(restaurantToEdit.openingTime),
              closingTime: formatUTCToLocalInput(restaurantToEdit.closingTime),
          }
        : {
              restaurantId: '',
              ownerId: ownerId,
              ...RESTAURANT_FORM_DEFAULT_VALUES,
          };

    // Initialize form controls, error states, and validation tracking via react-hook-form
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<Restaurant>({
        defaultValues: RESTAURANT_FORM_DEFAULT_VALUES as Restaurant,
        values: formValues as Restaurant,
    });

    // Determine if the modal is in edit mode based restaurant data to be edited
    const isEditMode = Boolean(restaurantToEdit);

    /**
     * Handle the form submission.
     */
    /**
     * Handle the form submission.
     * Automatically maps local browser time strings ("HH:MM") to precise UTC instances ("HH:MM:00Z")
     */
    const onSubmit = (data: Restaurant) => {
        // Perform conversions on time metrics
        const formattedData = {
            ...data,
            openingTime: formatLocalToUTCSubmit(data.openingTime),
            closingTime: formatLocalToUTCSubmit(data.closingTime),
        };

        if (isEditMode && restaurantToEdit) {
            const updatedRestaurant: RestaurantData = {
                ...restaurantToEdit,
                ...formattedData,
            };
            onEdit(updatedRestaurant);
        } else {
            const newRestaurant: RestaurantData = {
                ...formattedData,
                restaurantId: crypto.randomUUID(),
                ownerId,
            };
            onAdd(newRestaurant);
        }

        handleCancel();
    };

    /**
     * Resets form values and closes the modal view.
     */
    const handleCancel = () => {
        reset();
        onClose();
    };

    /**
     * To set the submit button text inside based on submitting status of form.
     */
    const getButtonText = () => {
        if (isSubmitting) return 'Submitting...';
        if (isEditMode) return 'Save';
        return 'Submit';
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
                        name="dietaryCategory"
                        control={control}
                        rules={restaurantValidation.type}
                        select
                        label="Cuisine Type"
                        error={!!errors.dietaryCategory}
                        helperText={errors.dietaryCategory?.message}
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
                        gap={theme.spacing(2)}
                        mt={2}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {getButtonText()}
                        </Button>
                    </Stack>
                </Stack>
            </StyledModal>
        </Modal>
    );
});
