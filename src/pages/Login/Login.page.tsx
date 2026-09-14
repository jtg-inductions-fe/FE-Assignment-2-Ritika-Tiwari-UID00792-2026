import { ResponsiveContainer } from '@components';
import { Login as LoginContainer } from '@containers';

/**
 * Renders the Login page.
 * @returns JSX.Element - The rendered login page.
 */
export const Login = () => (
    <ResponsiveContainer>
        <LoginContainer />
    </ResponsiveContainer>
);
