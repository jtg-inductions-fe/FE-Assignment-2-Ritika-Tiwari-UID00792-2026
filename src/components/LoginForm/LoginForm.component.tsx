import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { LogoImage, StyledBoxInner } from './LoginForm.styles';
import { FormTextField } from 'components/FormTextField/FormTextField.component';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@routes';
import Logo from '@assets/images/logo.webp';
import { loginValidation } from './LoginForm.validations';
import { LoginFormProps } from './LoginForm.types';
import { Snackbar } from 'components/Snackbar/Snackbar.component';

/**
 * Login Form component - renders the login form.
 * @param LoginFormProps - define the configuration properties to render the login form.
 * @returns  JSX.Element - The rendered login form.
 */
export const LoginForm = ({
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    showPassword,
    handleClickShowPassword,
    isSnackbarOpen,
    setIsSnackbarOpen,
    snackbarMessage,
}: LoginFormProps) => {
    return (
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
                name="email"
                control={control}
                rules={loginValidation.email}
                id="email"
                type="email"
                autoComplete="email"
                label="Enter your Email"
                variant="outlined"
            />

            <FormTextField
                name="password"
                control={control}
                rules={loginValidation.password}
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
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

            <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Login'}
            </Button>

            <Box display="inline-flex" gap={1}>
                <Typography variant="body2" fontWeight="regular">
                    Don&apos;t have an account ?
                </Typography>

                <Link component={NavLink} to={ROUTES.SING_UP}>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                    >
                        Sign up
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
};
