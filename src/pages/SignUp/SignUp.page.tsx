import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from '@mui/material';

import Logo from '@assets/images/logo.webp';
import ChefImage from '@assets/images/undraw_chef_yoa7.svg';
import { ResponsiveContainer, Snackbar } from '@components';
import { useAuth } from '@hook';

import {
    LogoImage,
    StyledBoxInner,
    StyledBoxOuter,
    StyledImage,
    StyledTextField,
} from './SignUp.styles';
import { SignupFormData } from './SignUp.types';
import { SignupValidation } from './SignUp.validations';

/**
 * Renders the signUp page.
 * @returns JSX.Element - The rendered SignUp page.
 */
export const SignUp = () => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
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
            role: 'customer',
        },
    });

    const watchPassword = watch('password');

    const { handleSignup } = useAuth();

    /**
     * Handle form submit state
     * @param data - signup form data after user submit signup form
     */
    const onSubmit = (data: SignupFormData) => {
        try {
            if (handleSignup(data) !== null) {
                void navigate('/');
            } else {
                setIsSnackbarOpen(true);
            }
        } catch (error) {
            // Redirection back if execution fails
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
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

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
                                <StyledTextField
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
                            rules={SignupValidation.password}
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
                                <StyledTextField
                                    {...field}
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    label="Confirm your password"
                                    variant="outlined"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowConfirmPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? (
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

                        <FormControl component="fieldset">
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

                        <Button variant="contained" type="submit">
                            Sign Up
                        </Button>

                        <Box display="inline-flex" gap={1}>
                            <Typography variant="body2" fontWeight="regular">
                                Already have an account?
                            </Typography>
                            <Link component={NavLink} to={'/login'}>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color="primary"
                                >
                                    Login
                                </Typography>
                            </Link>
                        </Box>
                    </StyledBoxInner>
                    <StyledImage src={ChefImage} alt="Chef Image" />
                </StyledBoxOuter>
                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={2000}
                    onClose={() => setIsSnackbarOpen(false)}
                    message="User already exist."
                    state="error"
                />
            </Box>
        </ResponsiveContainer>
    );
};
