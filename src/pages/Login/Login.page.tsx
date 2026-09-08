import { JSX, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    Typography,
} from '@mui/material';

import Logo from '@assets/images/logo.webp';
import ChefImage from '@assets/images/undraw_chef_yoa7.svg';
import { ResponsiveContainer } from '@components';
import { useAuth } from '@hook';

import {
    LogoImage,
    StyledBoxInner,
    StyledBoxOuter,
    StyledImage,
    StyledTextField,
} from './Login.styles';
import { LoginFormData } from './Login.types';
import { LoginValidation } from './Login.validations';

/**
 * Renders the Login page.
 * @returns JSX.Element - The rendered login page.
 */
export const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitSuccessful, errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { handleLogin } = useAuth();
    /**
     * Handle form submit state
     * @param data - login form data after user submit login form
     */
    const onSubmit = (data: LoginFormData) => {
        const user = handleLogin(data, setError);
        if (user) {
            try {
                void navigate('/');
            } catch (error) {
                if (error) {
                    void navigate('/login');
                }
            }
        }
    };
    // Resetting the form fields after the successful submission of form
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <ResponsiveContainer>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
            >
                <StyledBoxOuter>
                    <StyledBoxInner
                        as="form"
                        onSubmit={(e) => {
                            void handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                        >
                            <LogoImage src={Logo} alt="Company Logo" />
                            <Typography variant="h6" fontWeight="bold">
                                Swaad
                            </Typography>
                        </Stack>
                        <Controller
                            name="email"
                            control={control}
                            rules={LoginValidation.email}
                            render={({ field }) => (
                                <StyledTextField
                                    {...field}
                                    id="email"
                                    type="email"
                                    label="Enter your Email"
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={LoginValidation.password}
                            render={({ field }) => (
                                <StyledTextField
                                    {...field}
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Enter your password"
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <Button type="submit" variant="contained">
                            Login
                        </Button>

                        <Box display="inline-flex" gap={1}>
                            <Typography variant="body2" fontWeight="regular">
                                Don&apos;t have an account ?
                            </Typography>

                            <Link component={NavLink} to={'/sign-up'}>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color="primary"
                                >
                                    Sign Up
                                </Typography>
                            </Link>
                        </Box>
                    </StyledBoxInner>
                    <StyledImage src={ChefImage} alt="Chef Image" />
                </StyledBoxOuter>
            </Box>
        </ResponsiveContainer>
    );
};
