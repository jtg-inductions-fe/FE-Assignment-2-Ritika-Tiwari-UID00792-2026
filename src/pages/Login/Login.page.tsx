import ChefImage from '@assets/images/undraw_chef.webp';
import { ResponsiveContainer } from '@components';
import { Login as LoginContainer } from '@containers';

import { StyledBoxOuter, StyledImage } from './Login.styles';

/**
 * Renders the Login page.
 * @returns JSX.Element - The rendered login page.
 */
export const Login = () => (
    <ResponsiveContainer>
        <StyledBoxOuter>
            <LoginContainer />
            <StyledImage src={ChefImage} alt="Chef Image" />
        </StyledBoxOuter>
    </ResponsiveContainer>
);
