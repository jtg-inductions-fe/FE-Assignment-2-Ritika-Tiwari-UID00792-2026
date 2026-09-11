import { JSX, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { addRestaurant, editRestaurant } from '@store';
import { Restaurant as RestaurantData } from '../Restaurant.types';
import { RestaurantValidation } from '../Restaurant.validations';

interface AddRestaurantModalProps {
  open: boolean;
  onClose: () => void;
  ownerId: string;
  restaurantToEdit?: RestaurantData | null; // Optional data prop for handling edits
}

type RestaurantFormData = Omit<RestaurantData, 'restaurantId' | 'ownerId'>;

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const AddRestaurantModal = ({
  open,
  onClose,
  ownerId,
  restaurantToEdit,
}: AddRestaurantModalProps): JSX.Element => {
  const dispatch = useDispatch();
  const isEditMode = Boolean(restaurantToEdit);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<RestaurantFormData>({
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

  // Watch modal focus context. If edit data arrives or changes, sync form buffers.
  useEffect(() => {
    if (restaurantToEdit) {
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

  const onSubmit = (data: RestaurantFormData) => {
    if (isEditMode && restaurantToEdit) {
      const updatedRestaurant: RestaurantData = {
        ...restaurantToEdit,
        ...data, 
      };
      dispatch(editRestaurant(updatedRestaurant));
    } else {
      const newRestaurant: RestaurantData = {
        ...data,
        restaurantId: `rest_${Date.now()}`,
        ownerId,
      };
      dispatch(addRestaurant(newRestaurant));
    }
    handleCancel();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel} aria-labelledby="restaurant-modal-title">
      <Box sx={modalStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="restaurant-modal-title" variant="h6" fontWeight="bold">
            {isEditMode ? 'Edit Restaurant Details' : 'Add New Restaurant'}
          </Typography>
          <IconButton onClick={handleCancel} aria-label="close modal" edge="end">
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
              <TextField {...field} label="Restaurant Name" error={!!errors.name} helperText={errors.name?.message} fullWidth />
            )}
          />

          <Controller
            name="type"
            control={control}
            rules={RestaurantValidation.type}
            render={({ field }) => (
              <TextField {...field} select label="Cuisine Type" error={!!errors.type} helperText={errors.type?.message} fullWidth>
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
              <TextField {...field} label="Description" multiline rows={2} error={!!errors.description} helperText={errors.description?.message} fullWidth />
            )}
          />

          <Stack direction="row" gap={2}>
            <Controller
              name="openingTime"
              control={control}
              rules={RestaurantValidation.openingTime}
              render={({ field }) => (
                <TextField {...field} label="Opening Time" type="time" InputLabelProps={{ shrink: true }} error={!!errors.openingTime} helperText={errors.openingTime?.message} fullWidth />
              )}
            />
            <Controller
              name="closingTime"
              control={control}
              rules={RestaurantValidation.closingTime}
              render={({ field }) => (
                <TextField {...field} label="Closing Time" type="time" InputLabelProps={{ shrink: true }} error={!!errors.closingTime} helperText={errors.closingTime?.message} fullWidth />
              )}
            />
          </Stack>

          <Controller
            name="address"
            control={control}
            rules={RestaurantValidation.address}
            render={({ field }) => (
              <TextField {...field} label="Street Address" error={!!errors.address} helperText={errors.address?.message} fullWidth />
            )}
          />

          <Controller
            name="imageUrl"
            control={control}
            rules={RestaurantValidation.imageUrl}
            render={({ field }) => (
              <TextField {...field} label="Display Image URL" error={!!errors.imageUrl} helperText={errors.imageUrl?.message} fullWidth />
            )}
          />

          <Stack direction="row" justifyContent="flex-end" gap={1.5} mt={1}>
            <Button onClick={handleCancel} color="inherit" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : isEditMode ? 'Save Changes' : 'Submit Restaurant'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
