import ChefImage from '@assets/images/undraw_chef.webp';
import { ResponsiveContainer } from '@components';

import { StyledBoxOuter, StyledImage } from './SignUp.styles';
import { Box } from '@mui/material';
import { SignUp as SignUpContainer } from '@containers';

/**
 * Renders the signUp page.
 * @returns JSX.Element - The rendered SignUp page.
 */
export const SignUp = () => (
    <ResponsiveContainer>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <StyledBoxOuter>
                <SignUpContainer />
                <StyledImage src={ChefImage} alt="Chef Image" />
            </StyledBoxOuter>
        </Box>
    </ResponsiveContainer>
);
