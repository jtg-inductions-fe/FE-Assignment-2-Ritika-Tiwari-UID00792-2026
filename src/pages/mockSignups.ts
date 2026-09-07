import { SignupFormData } from 'pages/Auth/SignUp/Signup.types';

// Grouped by UserRole to test customer-specific workflows
export const mockSignups: SignupFormData[] = [
    {
        id: 'user_cust_01',
        role: 'customer',
        name: 'Emma Watson',
        email: 'emma.watson@example.com',
        password: 'CustomerPass123!',
        confirmPassword: 'CustomerPass123!',
    },
    {
        id: 'user_cust_02',
        role: 'customer',
        name: 'Liam Neeson',
        email: 'liam.n@example.org',
        password: 'TakenPassword456!',
        confirmPassword: 'TakenPassword456!',
    },
    {
        id: 'user_own_01',
        role: 'owner',
        name: 'Arthur Pendragon',
        email: 'arthur@camelot-ventures.com',
        password: 'ExcaliburPass789#',
        confirmPassword: 'ExcaliburPass789#',
    },
    {
        id: 'user_own_02',
        role: 'owner',
        name: 'Morgana LeFay',
        email: 'morgana@avalon-shop.net',
        password: 'SorcerySecure999!',
        confirmPassword: 'SorcerySecure999!',
    },
];
