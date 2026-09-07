import mockUsers from '../../../mock/users.json';
import { Header as HeaderComponent } from '../Header.component';
import { User } from '../Header.types';

export const Header = () => {
    // For the demo purpose only
    const mockUser: User = mockUsers[1];
    const cartCount = 4;

    return <HeaderComponent user={mockUser} cartCount={cartCount} />;
};
