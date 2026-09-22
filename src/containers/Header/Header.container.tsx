import { Header as HeaderComponent } from '@components';
import { useAuth, useCart } from '@hooks';
import { User } from '@types';

/**
 * Header Container
 *
 * Provides the business logic related code, such as fetching the user from the mock json file.
 * @returns The rendered global application header component.
 */
export const Header = () => {
    const { fetchCurrentUser, isLoggedIn } = useAuth();
    const { cartCount } = useCart();

    const registeredUser = fetchCurrentUser() as User;

    return (
        <HeaderComponent
            user={registeredUser}
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
        />
    );
};
