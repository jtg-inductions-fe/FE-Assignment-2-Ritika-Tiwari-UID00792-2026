import { Box, Stack, TextField, Typography } from '@mui/material';

import Logo from '@assets/images/logo.webp';
import ChefImage from '@assets/images/undraw_chef_yoa7.svg';
import { ButtonPrimary, ResponsiveContainer } from '@components';

import {
    LogoImage,
    StyledBoxInner,
    StyledBoxOuter,
    StyledImage,
} from './Singup.styles';
import { StyledLink } from './Singup.styles';

export const Signup = () => (
    <ResponsiveContainer>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"
        >
            <StyledBoxOuter>
                <StyledBoxInner>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <LogoImage src={Logo} alt="Company Logo" />
                        <Typography variant="h6" fontWeight="bold">
                            Swaad
                        </Typography>
                    </Stack>
                    <TextField
                        id="name"
                        label="Enter your Name"
                        variant="outlined"
                    />
                    <TextField
                        id="email"
                        label="Enter your Email"
                        variant="outlined"
                    />
                    <TextField
                        id="password"
                        label="Enter your password"
                        variant="outlined"
                    />
                    <ButtonPrimary>Sign Up</ButtonPrimary>

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
