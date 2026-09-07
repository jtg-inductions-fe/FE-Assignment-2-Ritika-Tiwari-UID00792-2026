import users from '@mock/users.json';

import { Header as HeaderComponent } from '../Header.component';
import { User } from '../Header.types';

/**
 * Header Container
 *
 * Provides the business logic related code, such as fetching the user from the mock json file.
 * @returns The rendered global application header component.
 */
export const Header = () => {
    // For the demo purposes only
    const mockUser: User = users[1];
    const cartCount = 4;

    return <HeaderComponent user={mockUser} cartCount={cartCount} />;
};
