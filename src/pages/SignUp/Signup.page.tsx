import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import Logo from '@assets/images/logo.webp';
import ChefImage from '@assets/images/undraw_chef_yoa7.svg';
import { ButtonPrimary, ResponsiveContainer } from '@components';

import {
    LogoImage,
    StyledBoxInner,
    StyledBoxOuter,
    StyledImage,
} from './Signup.styles';
import { StyledLink } from './Signup.styles';
import { SignupFormData } from './Signup.types';
import { SignupValidation } from './Signup.validations';

export const Signup = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitSuccessful, errors },
    } = useForm<SignupFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
        },
    });
    const watchPassword = watch('password');
    const onSubmit = () => {
        void navigate('/login');
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
                            name="name"
                            control={control}
                            rules={SignupValidation.name}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="name"
                                    label="Enter your Name"
                                    variant="outlined"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            rules={SignupValidation.email}
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
                            rules={SignupValidation.password}
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
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === watchPassword ||
                                    'Passwords do not match',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="confirmPassword"
                                    type="password"
                                    label="Confirm your password"
                                    variant="outlined"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}
                        />

                        {/* Role Checkbox Selector */}

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Role</FormLabel>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        <FormControlLabel
                                            value="customer"
                                            control={<Radio />}
                                            label="Customer"
                                        />
                                        <FormControlLabel
                                            value="owner"
                                            control={<Radio />}
                                            label="Owner"
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                        <ButtonPrimary type="submit">Sign Up</ButtonPrimary>

                        <Box display="inline-flex" gap={1}>
                            <Typography variant="body2" fontWeight="regular">
                                Already have an account?
                            </Typography>
                            <StyledLink to={'/login'}>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color="primary"
                                >
                                    Login
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
