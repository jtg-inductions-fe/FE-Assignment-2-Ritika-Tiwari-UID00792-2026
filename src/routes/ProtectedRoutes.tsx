import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@routes';

export const ProtectedRoutes = () => {
    // If not logged in, redirect to login page
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!userIsLoggedIn) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Renders the child routes (Home, Restaurant, Menu, etc.) if authenticated
    return <Outlet />;
};
