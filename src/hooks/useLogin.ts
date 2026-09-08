import { LoginFormData } from 'pages/Login/Login.types';
import { login } from 'store/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';

import users from '@mock/users.json';

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const registeredUser = useAppSelector((state) => state.auth.user);

    const handleLogin = (data: LoginFormData) => {
        // Find the mock user
        const mockUser = users.find(
            (user: { email: string }) =>
                user.email.toLowerCase() === data.email.toLowerCase(),
        );

        // Validate against registered user state
        const registeredUserMatch =
            registeredUser &&
            registeredUser.email.toLowerCase() === data.email.toLowerCase();

        // Authenticate if both checks pass
        if (registeredUserMatch && mockUser) {
            dispatch(login(data));
            localStorage.setItem('isLoggedIn', 'true');
            return mockUser;
        } else {
            return null;
        }
    };

    return { handleLogin };
};
