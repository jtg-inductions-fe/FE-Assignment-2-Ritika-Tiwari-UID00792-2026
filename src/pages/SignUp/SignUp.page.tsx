import { ResponsiveContainer } from '@components';
import { SignUp as SignUpContainer } from '@containers';

/**
 * Renders the signUp page.
 * @returns JSX.Element - The rendered SignUp page.
 */
export const SignUp = () => (
    <ResponsiveContainer>
        <SignUpContainer />
    </ResponsiveContainer>
);
