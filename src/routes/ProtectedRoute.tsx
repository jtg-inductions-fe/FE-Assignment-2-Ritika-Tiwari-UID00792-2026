import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    // If not logged in, redirect to login page
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!userIsLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Renders the child routes (Home, Restaurant, Menu, etc.) if authenticated
    return <Outlet />;
};
