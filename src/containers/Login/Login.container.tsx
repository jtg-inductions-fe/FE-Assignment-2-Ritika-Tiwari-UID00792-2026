import { useState } from 'react';

import { LoginFormData } from 'components/LoginForm/LoginForm.types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ChefImage from '@assets/images/undraw_chef.webp';
import { LoginForm } from '@components';
import { useAuth } from '@hooks';
import { ROUTES } from '@routes';

import { StyledBoxOuter, StyledImage } from './Login.styles';

/**
 * Login Container
 *
 * Provides the business logic for user authentication, form state management and navigation after a successful login.
 * @returns The rendered loginForm.
 */
export const Login = () => {
    const navigate = useNavigate();

    // State to manage the Visibility of the snackbar.
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    // State to manage the message shown on the snackbar.
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

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
                    setSnackbarMessage('Some error occurred, try again late.');
                    setIsSnackbarOpen(true);
                }
            }
        }
    };

    // State to manage password visibility state.
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Function to set the show password state to show password when user click the icon.
     */
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <StyledBoxOuter alignSelf="center">
            <LoginForm
                control={control}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                isSnackbarOpen={isSnackbarOpen}
                setIsSnackbarOpen={setIsSnackbarOpen}
                snackbarMessage={snackbarMessage}
            />
            <StyledImage src={ChefImage} alt="Chef Image" />
        </StyledBoxOuter>
    );
};
