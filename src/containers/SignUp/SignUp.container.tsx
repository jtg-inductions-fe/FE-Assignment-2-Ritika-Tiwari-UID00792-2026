import { useState } from 'react';

import { SignUpFormData } from 'components/SignUpForm/signUpForm.types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks';
import { SignUpForm } from '@components';
import { ROUTES } from '@routes';

/**
 * Signup Container
 *
 * Provides the business logic for user registration, form state management and navigation after a successful registration.
 * @returns The rendered signupForm.
 */
export const SignUp = () => {
    const navigate = useNavigate();

    // State to manage the Visibility of the snackbar.
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

    // State to manage the message shown on the snackbar.
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    // Initializing react hook form  to manage form inputs, validation state and submission tracking
    const {
        control,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'customer',
        },
    });

    const watchPassword = watch('password');

    // Custom hook to handle the signup form submission.
    const { handleSignup } = useAuth();

    /**
     * Handle form submit state
     * @param data - signup form data after user submit signup form
     */
    const onSubmit = (data: SignUpFormData) => {
        try {
            if (handleSignup(data)) {
                void navigate(ROUTES.ROOT);
            } else {
                setIsSnackbarOpen(true);
                setSnackbarMessage('User already exist.');
            }
        } catch (error) {
            if (error) {
                setIsSnackbarOpen(true);
                setSnackbarMessage('Some error occurred, try again later.');
            }
        }
    };

    // State to manage password visibility state.
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Function to set the show password state to show password when user click the icon.
     */
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // State to manage confirm password visibility state.
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    /**
     * Function to set the show confirm password state to show confirm password when user click the icon.
     */
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    return (
        <SignUpForm
            control={control}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            watchPassword={watchPassword}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            showConfirmPassword={showConfirmPassword}
            handleClickShowConfirmPassword={handleClickShowConfirmPassword}
            isSnackbarOpen={isSnackbarOpen}
            setIsSnackbarOpen={setIsSnackbarOpen}
            snackbarMessage={snackbarMessage}
        />
    );
};
