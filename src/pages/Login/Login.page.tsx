import { useNavigate } from 'react-router-dom';

import { Login as LoginContainer } from '@containers';
import { useAuth } from '@hooks';
import { ROUTES } from '@routes';

/**
 * Renders the Login page.
 * @returns JSX.Element - The rendered login page.
 */
export const Login = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
       void navigate(ROUTES.ROOT);
    }
    return <LoginContainer />;
};
