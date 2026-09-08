import { useAppSelector } from 'store/hook';

import { useAuth } from '@hook';

import { Header as HeaderComponent } from '../Header.component';

/**
 * Header Container
 *
 * Provides the business logic related code, such as fetching the user from the mock json file.
 * @returns The rendered global application header component.
 */
export const Header = () => {
    const { fetchUser } = useAuth();
    const registeredUser = fetchUser();
    const cartCount = 4;
    // Selecting the current logged in state of the user from the redux store.
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <HeaderComponent
            user={registeredUser}
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
        />
    );
};
