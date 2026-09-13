import { Box } from '@mui/material';

import ChefImage from '@assets/images/undraw_chef.webp';
import { ResponsiveContainer } from '@components';

import { StyledBoxOuter, StyledImage } from './Login.styles';

/**
 * Renders the Login page.
 * @returns JSX.Element - The rendered login page.
 */
export const Login = () => (
    <ResponsiveContainer>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <StyledBoxOuter>
                <StyledImage src={ChefImage} alt="Chef Image" />
            </StyledBoxOuter>
        </Box>
    </ResponsiveContainer>
);
