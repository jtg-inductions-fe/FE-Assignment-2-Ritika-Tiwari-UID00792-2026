import { MainLayout } from 'layouts';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    // If not logged in, redirect to login page
    // This is for the demo purpose
    const isAuthenticated = true;
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    //If logged in go to main layout
    return <MainLayout />;
};

export default ProtectedRoute;
