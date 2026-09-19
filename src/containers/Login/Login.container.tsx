import { useState } from 'react';

import { LoginFormData } from 'components/LoginForm/LoginForm.types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ChefImage from '@assets/images/undraw_chef.webp';
import { LoginForm } from '@components';
import { useAuth } from '@hooks';
import { ROUTES } from '@routes';
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

    // Custom hook to handle the login form submission.
    const { handleLogin } = useAuth();

    /**
     * Function to handle form submission
     * if user is authenticated successfully , navigate to the dashboard else show the error message snackbar.
     * @param data - login form data after user submit login form
     */
    const onSubmit = (data: LoginFormData) => {
        const user = handleLogin(data, setError);
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
