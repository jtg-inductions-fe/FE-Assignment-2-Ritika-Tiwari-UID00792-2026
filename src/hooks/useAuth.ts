import { LoginFormData } from 'pages/Login/Login.types';
import { SignupFormData } from 'pages/SignUp/SignUp.types';
import { UseFormSetError } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { User } from '@types';
import { login, logout, signup } from 'store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    /**  This variable contains the registered users from the redux store. */
    const registeredUsers = useAppSelector((state) => state.auth.users);

    /**
     * Function handles the authentication logic after the user submit the login credentials.
     * @param data - login form data after user submit login form
     * @param setError - this will be passed by the login form to update the error states of the login form fields.
     */
    const handleLogin = (
        data: LoginFormData,
        setError: UseFormSetError<LoginFormData>,
    ) => {
        // Find the registered user from the registered users (fetched from redux store) to check whether the user registered or not.
        const registeredUser = registeredUsers.find(
            (user: { email: string }) =>
                user.email.toLowerCase() === data.email.toLowerCase(),
        );

        if (registeredUser) {
            // Check is the password is correct and matched the registered user's password otherwise set the error state for the password field.
            if (registeredUser.password === data.password) {
                dispatch(login(registeredUser));
                localStorage.setItem('isLoggedIn', 'true');
                return registeredUser;
            } else {
                setError('password', {
                    type: 'manual',
                    message: 'Password is incorrect.',
                });
            }
        } else {
            setError('email', {
                type: 'manual',
                message: 'This email is not registered.',
            });
            return null;
        }
    };

    /**
     * Function handles the authentication logic after the user submit the signup credentials.
     * @param data - Signup form data after user submit signup form
     */
    const handleSignup = (data: SignupFormData) => {
        const newUser: SignupFormData = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email.toLowerCase(),
            password: data.password,
            role: data.role,
        };

        // Check if the user is already registered for the email credential.
        const registeredUser = registeredUsers.find(
            (user: { email: string }) =>
                user.email.toLowerCase() === data.email.toLowerCase(),
        );

        if (registeredUser) {
            return null;
        } else {
            dispatch(signup(newUser));
            localStorage.setItem('isLoggedIn', 'true');
        }
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    /**
     * Function used to find the current registered user from the local storage.
     * @returns Current registered user
     */
    const fetchUser = () => {
        const user: string = localStorage.getItem('currentUser') || '';
        try {
            const CurrentRegisteredUser: User = JSON.parse(user) as User;
            return CurrentRegisteredUser;
        } catch {
            return null;
        }
    };

    return { handleLogin, handleSignup, handleLogout, fetchUser };
};
