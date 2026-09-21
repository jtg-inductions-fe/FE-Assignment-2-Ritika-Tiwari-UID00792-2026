import { useEffect } from 'react';

import { fetchRegisteredUsers } from '@services';
import {
    logout,
    setRegisteredUsers,
    useAppDispatch,
    useAppSelector,
} from '@store';
import { User } from '@types';

export const useAuth = () => {
    const dispatch = useAppDispatch();

    /**  This variable contains the registered users from the redux store. */
    const registeredUsers = useAppSelector((state) => state.auth.users);

    //  Fetch data only when restaurantId or dispatch changes
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users: User[] = (await fetchRegisteredUsers()) ?? [];
                dispatch(setRegisteredUsers(users));
            } catch (err) {
                if (err) {
                    return [];
                }
            } finally {
                return [];
            }
        };

        void fetchUsers();
    }, [dispatch]);

    /**
     * Helper function to locate a user by their email address.
     * @param users - take the list of registered users.
     * @param email - take the new email to check whether the user with this email exists in the registered users list or not.
     * @return registeredUser - the user exist with given email.
     */
    const findUserByEmail = (users: User[], email: string): User | undefined =>
        users.find((user: User) => user.email === email);

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
    const fetchCurrentUser = () => {
        const user: string = localStorage.getItem('currentUser') || '';
        try {
            const currentRegisteredUser = JSON.parse(user) as User;
            return currentRegisteredUser;
        } catch {
            return null;
        }
    };

    // Selecting the current logged in state of the user from the redux store.
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return {
        registeredUsers,
        findUserByEmail,
        handleLogout,
        fetchCurrentUser,
        isLoggedIn,
    };
};
