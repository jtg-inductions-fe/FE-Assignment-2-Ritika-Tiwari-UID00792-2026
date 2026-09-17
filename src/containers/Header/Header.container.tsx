import { useCart } from 'hooks/useCart';

import { Header as HeaderComponent } from '@components';
import { useAuth } from '@hooks';
import { User } from '@types';

/**
 * Header Container
 *
 * Provides the business logic related code, such as fetching the user from the mock json file.
 * @returns The rendered global application header component.
 */
export const Header = () => {
    const { fetchCurrentUser, isLoggedIn } = useAuth();
    const registeredUser = fetchCurrentUser() as User;
    const { cartCount } = useCart();
    const cartItemsCount = cartCount();

    return (
        <HeaderComponent
            user={registeredUser}
            cartCount={cartItemsCount}
            isLoggedIn={isLoggedIn}
        />
    );
};
