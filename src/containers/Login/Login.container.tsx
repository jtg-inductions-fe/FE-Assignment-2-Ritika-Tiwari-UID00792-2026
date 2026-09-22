import { useState } from 'react';

import { LoginFormData } from 'components/LoginForm/LoginForm.types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ChefImage from '@assets/images/undraw_chef.webp';
import { LoginForm } from '@components';
import { useAuth } from '@hooks';
import { ROUTES } from '@routes';
import { login, useAppDispatch } from '@store';
import { SnackbarConfig } from '@types';

import { StyledBoxOuter, StyledImage } from './Login.styles';

/**
 * Login Container
 *
 * Provides the business logic for user authentication, form state management and navigation after a successful login.
 * @returns The rendered loginForm.
 */
export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Custom hook to handle the login form submission.
    const { registeredUsers, findUserByEmail } = useAuth();

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
        setError,
        formState: { isSubmitting },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    /**
     * Function handles the authentication logic after the user submit the login credentials.
     * @param data - login form data after user submit login form
     * @param setError - this will be passed by the login form to update the error states of the login form fields.
     * @returns registeredUser - return the current registered user.
     */
    const handleLogin = (data: LoginFormData) => {
        // Find the registered user from the registered users (fetched from redux store) to check whether the user registered or not.
        const registeredUser = findUserByEmail(
            registeredUsers,
            data.email.toLocaleLowerCase(),
        );

        if (registeredUser) {
            // Check is the password is correct and matched the registered user's password otherwise set the error state for the password field.
            if (registeredUser.password === data.password) {
                dispatch(login(registeredUser));
                return registeredUser;
            } else {
                setError('password', {
                    type: 'manual',
                    message: 'Password is incorrect.',
                });
                return null;
            }
        } else {
            setError('email', {
                type: 'manual',
                message: 'This email is not registered.',
            });
            return null;
        }
    };

    /**
     * Function to handle form submission
     * if user is authenticated successfully , navigate to the dashboard else show the error message snackbar.
     * @param data - login form data after user submit login form
     */
    const onSubmit = (data: LoginFormData) => {
        const user = handleLogin(data);
        if (user) {
            try {
                void navigate(ROUTES.ROOT);
            } catch (error) {
                if (error) {
                    setSnackBarConfig({
                        open: true,
                        message: 'Some error occurred, try again later.',
                        variant: 'error',
                    });
                }
            }
        }
    };

    return (
        <StyledBoxOuter>
            <LoginForm
                control={control}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
                snackbarConfig={snackbarConfig}
                setSnackbarConfig={setSnackBarConfig}
            />
            <StyledImage src={ChefImage} alt="Chef Image" />
        </StyledBoxOuter>
    );
};
