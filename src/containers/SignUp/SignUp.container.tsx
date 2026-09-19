import { useState } from 'react';

import { SignUpFormData } from 'components/SignUpForm/SignUpForm.types';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ChefImage from '@assets/images/undraw_chef.webp';
import { SignUpForm } from '@components';
import { useAuth } from '@hooks';
import { ROUTES } from '@routes';
import { SnackbarConfig } from '@types';

import { StyledBoxOuter, StyledImage } from './SignUp.styles';

/**
 * Signup Container
 *
 * Provides the business logic for user registration, form state management and navigation after a successful registration.
 * @returns The rendered signupForm.
 */
export const SignUp = () => {
    const navigate = useNavigate();

    // State to manage the configuration (visibility,message and state) of the snackbar.
    const [snackbarConfig, setSnackBarConfig] = useState<SnackbarConfig>({
        open: false,
        message: '',
        variant: 'success',
    });

    // Initializing react hook form  to manage form inputs, validation state and submission tracking
    const {
        control,
        handleSubmit,
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

    const watchPassword = useWatch({ control, name: 'password' });

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
                setSnackBarConfig({
                    open: true,
                    message: 'User already exits.',
                    variant: 'error',
                });
            }
        } catch (error) {
            if (error) {
                setSnackBarConfig({
                    open: true,
                    message: 'Some error occurred, try again later.',
                    variant: 'error',
                });
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
        <StyledBoxOuter>
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
                snackbarConfig={snackbarConfig}
                setSnackbarConfig={setSnackBarConfig}
            />
            <StyledImage src={ChefImage} alt="Chef Image" />
        </StyledBoxOuter>
    );
};
