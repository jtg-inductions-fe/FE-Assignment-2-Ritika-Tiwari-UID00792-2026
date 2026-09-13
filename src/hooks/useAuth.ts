import { LoginFormData } from 'components/LoginForm/LoginForm.types';
import { SignUpFormData } from 'components/SignUpForm/signUpForm.types';
import { UseFormSetError } from 'react-hook-form';

import { login, logout, signup, useAppDispatch, useAppSelector } from '@store';
import { User } from '@types';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    /**  This variable contains the registered users from the redux store. */
    const registeredUsers = useAppSelector((state) => state.auth.users);

    /**
     * Helper function to locate a user by their email address.
     * @param users - take the list of registered users.
     * @param email - take the new user email to check whether the user with this email exists in the registered users list or not.
     * @return registeredUser - the user exist with given email.
     */
    const findUserByEmail = (users: User[], email: string): User | undefined =>
        users.find((user: User) => user.email === email);

    /**
     * Function handles the authentication logic after the user submit the login credentials.
     * @param data - login form data after user submit login form
     * @param setError - this will be passed by the login form to update the error states of the login form fields.
     * @returns registeredUser - return the current registered user.
     */
    const handleLogin = (
        data: LoginFormData,
        setError: UseFormSetError<LoginFormData>,
    ) => {
        // Find the registered user from the registered users (fetched from redux store) to check whether the user registered or not.
        const registeredUser = findUserByEmail(
            registeredUsers,
            data.email.toLocaleLowerCase(),
        );

        if (registeredUser) {
            // Check is the password is correct and matched the registered user's password otherwise set the error state for the password field.
            if (registeredUser.password === data.password) {
                dispatch(login(registeredUser));
                return registeredUser;
            } else {
                setError('password', {
                    type: 'manual',
                    message: 'Password is incorrect.',
                });
                return null;
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
     * Function handles the authentication logic after the user submit the SignUp credentials.
     * @param data - SignUp form data after user submit SignUp form
     * @returns newUser
     */
    const handleSignup = (data: SignUpFormData) => {
        const newUser: SignUpFormData = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email.toLowerCase(),
            password: data.password,
            role: data.role,
        };

        // Check if the user is already registered for the email credential.
        const registeredUser = findUserByEmail(registeredUsers, newUser.email);

        if (registeredUser) {
            return null;
        } else {
            dispatch(signup(newUser));
            return newUser;
        }
    };

    /**
     * Function handles the logout functionality.
     * @param data - SignUp form data after user submit SignUp form
     * @returns newUser
     */
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
            const currentRegisteredUser: User = JSON.parse(user) as User;
            return currentRegisteredUser;
        } catch {
            return null;
        }
    };

    return { handleLogin, handleSignup, handleLogout, fetchUser };
};
