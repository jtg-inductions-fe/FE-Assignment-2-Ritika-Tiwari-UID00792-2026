import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store';
import { login } from 'store/authSlice';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import Logo from '@assets/images/logo.webp';
import ChefImage from '@assets/images/undraw_chef_yoa7.svg';
import { ResponsiveContainer } from '@components';

import {
    LogoImage,
    StyledBoxInner,
    StyledBoxOuter,
    StyledImage,
} from './Login.styles';
import { StyledLink } from './Login.styles';
import { LoginFormData } from './Login.types';
import { LoginValidation } from './Login.validations';
import { User } from '../Auth.types';
import { mockSignups } from '../mockSignups';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
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

    const onSubmit = (data: LoginFormData) => {
        try {
            // Fetch registered users list from localStorage
            const storedUsers: User[] = mockSignups;

            // Validate if the email exists
            const existingUser = storedUsers.find(
                (user) => user.email.toLowerCase() === data.email.toLowerCase(),
            );

            if (!existingUser) {
                setError('email', {
                    type: 'manual',
                    message: 'This email is not registered.',
                });
                return;
            }

            // Validate password
            if (existingUser.password !== data.password) {
                setError('password', {
                    type: 'manual',
                    message: 'Incorrect password.',
                });
                return;
            }

            // Update local storage state
            localStorage.setItem('isLoggedIn', 'true');

            // Update Redux store (Passing the matched user metadata from signup)
            dispatch(login(data));

            void navigate('/home');
        } catch (error) {
            if (error) {
                void navigate('/login');
            }
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

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
                                <TextField
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
                                <TextField
                                    {...field}
                                    id="password"
                                    type="password"
                                    label="Enter your password"
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <Button type="submit" variant="contained">Login</Button>

                        <Box display="inline-flex" gap={1}>
                            <Typography variant="body2" fontWeight="regular">
                                Don&apos;t have an account ?
                            </Typography>

                            <StyledLink to={'/sign-up'}>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color="primary"
                                >
                                    Sign Up
                                </Typography>
                            </StyledLink>
                        </Box>
                    </StyledBoxInner>
                    <StyledImage src={ChefImage} alt="Chef Image" />
                </StyledBoxOuter>
            </Box>
        </ResponsiveContainer>
    );
};
