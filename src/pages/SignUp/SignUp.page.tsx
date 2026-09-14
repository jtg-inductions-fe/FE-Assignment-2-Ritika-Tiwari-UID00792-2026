import { useNavigate } from 'react-router-dom';

import { SignUp as SignUpContainer } from '@containers';
import { useAuth } from '@hooks';
import { ROUTES } from '@routes';

/**
 * Renders the signUp page.
 * @returns JSX.Element - The rendered SignUp page.
 */
export const SignUp = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
        void navigate(ROUTES.ROOT);
    }
    return <SignUpContainer />;
};
