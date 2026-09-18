import { Header as HeaderComponent } from '@components';
import { useAuth } from '@hooks';

/**
 * Header Container
 *
 * Provides the business logic related code, such as fetching the user from the mock json file.
 * @returns The rendered global application header component.
 */
export const Header = () => {
    const { fetchCurrentUser, isLoggedIn } = useAuth();
    const registeredUser = fetchCurrentUser();
    // TODO: This will be remove and actual cartCount will be used here after cart section.
    const cartCount = 4;

    return (
        <HeaderComponent
            user={registeredUser}
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
        />
    );
};
