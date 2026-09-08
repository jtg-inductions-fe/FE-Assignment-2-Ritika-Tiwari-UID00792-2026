import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import Logo from '@assets/images/logo.webp';
import ChefImage from '@assets/images/undraw_chef_yoa7.svg';
import { ResponsiveContainer } from '@components';
import { useLogin } from '@hook';

import {
    LogoImage,
    StyledBoxInner,
    StyledBoxOuter,
    StyledImage,
} from './Login.styles';
import { StyledLink } from './Login.styles';
import { LoginFormData } from './Login.types';
import { LoginValidation } from './Login.validations';

export const Login = () => {
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

    const { handleLogin } = useLogin();
    const onSubmit = (data: LoginFormData) => {
        const user = handleLogin(data);
        if (user) {
            try {
                void navigate('/home');
            } catch (error) {
                if (error) {
                  void navigate('/login');
                }
            }
        } else {
            setError('email', {
                type: 'manual',
                message: 'This email is not registered.',
            });
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
                        <Button type="submit" variant="contained">
                            Login
                        </Button>

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
