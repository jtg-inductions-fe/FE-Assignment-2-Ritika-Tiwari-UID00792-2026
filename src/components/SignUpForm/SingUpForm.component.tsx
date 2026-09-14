import { FormTextField } from 'components/FormTextField/FormTextField.component';
import { Snackbar } from 'components/Snackbar/Snackbar.component';
import { Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

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
import { ROUTES } from '@routes';

import { LogoImage, StyledBoxInner } from './SignUpForm.styles';
import { SignUpFormProps } from './SignUpForm.types';
import { signUpValidation } from './SignUpForm.validations';

/**
 * SignUp Form component - renders the SignUp form.
 * @param SignUpFormProps - define the configuration properties to render the SignUp form.
 * @returns  JSX.Element - The rendered SignUp form.
 */
export const SignUpForm = ({
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    watchPassword,
    showPassword,
    handleClickShowPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword,
    isSnackbarOpen,
    setIsSnackbarOpen,
    snackbarMessage,
}: SignUpFormProps) => (
    <StyledBoxInner
        as="form"
        onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
        }}
    >
        <Stack direction="row" spacing={1.5} alignItems="center">
            <LogoImage src={Logo} alt="Brand Logo" />
            <Typography variant="h6" fontWeight="bold">
                Swaad
            </Typography>
        </Stack>

        <FormTextField
            name="name"
            control={control}
            rules={signUpValidation.name}
            id="name"
            type="text"
            autoComplete="name"
            label="Enter your Name"
            variant="outlined"
        />

        <FormTextField
            name="email"
            control={control}
            rules={signUpValidation.email}
            id="email"
            type="email"
            autoComplete="email"
            label="Enter your Email"
            variant="outlined"
        />

        <FormTextField
            name="password"
            control={control}
            rules={signUpValidation.password}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            label="Enter your password"
            variant="outlined"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
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
                },
            }}
        />

        <FormTextField
            name="confirmPassword"
            control={control}
            rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                    value === watchPassword || 'Passwords do not match',
            }}
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            label="Confirm your password"
            variant="outlined"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
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
                },
            }}
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

        <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign up'}
        </Button>

        <Box display="inline-flex" gap={1}>
            <Typography variant="body2" fontWeight="regular">
                Already have an account?
            </Typography>
            <Link component={NavLink} to={ROUTES.LOGIN}>
                <Typography variant="body2" fontWeight="bold" color="primary">
                    Login
                </Typography>
            </Link>
        </Box>
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={2000}
            onClose={() => setIsSnackbarOpen(false)}
            message={snackbarMessage}
            state="error"
        />
    </StyledBoxInner>
);
