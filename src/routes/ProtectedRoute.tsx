import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // If not logged in, redirect to login page
    // This is for the demo purpose
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!userIsLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Renders the child routes (Home, Restaurant, Menu, etc.) if authenticated
    return <Outlet />;
};

export default ProtectedRoute;
