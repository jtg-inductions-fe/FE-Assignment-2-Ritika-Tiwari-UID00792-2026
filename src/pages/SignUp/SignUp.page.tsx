import ChefImage from '@assets/images/undraw_chef.webp';
import { ResponsiveContainer } from '@components';
import { SignUp as SignUpContainer } from '@containers';

import { StyledBoxOuter, StyledImage } from './SignUp.styles';

/**
 * Renders the signUp page.
 * @returns JSX.Element - The rendered SignUp page.
 */
export const SignUp = () => (
    <ResponsiveContainer>
        <StyledBoxOuter>
            <SignUpContainer />
            <StyledImage src={ChefImage} alt="Chef Image" />
        </StyledBoxOuter>
    </ResponsiveContainer>
);
