import { useState } from 'react';

import { SignUpFormData } from 'components/SignUpForm/SignUpForm.types';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ChefImage from '@assets/images/undraw_chef.webp';
import { SignUpForm } from '@components';
import { useAuth } from '@hooks';
import { ROUTES } from '@routes';
import { signup, useAppDispatch } from '@store';
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
    const dispatch = useAppDispatch();

    // Custom hook to handle the signup form submission.
    const { registeredUsers, findUserByEmail } = useAuth();

    // State to manage the configuration (visibility,message and state) of the snackbar.
    const [snackbarConfig, setSnackBarConfig] = useState<SnackbarConfig>({
        open: false,
        message: '',
        variant: 'success',
    });

    // State to manage password visibility state.
    const [showPassword, setShowPassword] = useState(false);

    // State to manage confirm password visibility state.
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    /**
     * Function to set the show password state to show password when user click the icon.
     */
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    /**
     * Function to set the show confirm password state to show confirm password when user click the icon.
     */
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

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

    /**
     * Function handles the authentication logic after the user submit the SignUp credentials.
     * @param data - SignUp form data after user submit SignUp form
     * @returns newUser
     */
    const handleSignup = (data: SignUpFormData) => {
        const newUser: SignUpFormData = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email.toLowerCase(),
            password: data.password,
            role: data.role,
        };

        // Check if the user is already registered for the email credential.
        const registeredUser = findUserByEmail(registeredUsers, newUser.email);

        if (registeredUser) {
            return null;
        } else {
            dispatch(signup(newUser));
            return newUser;
        }
    };

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
