import { MainLayout } from 'layouts';
import { Navigate} from 'react-router-dom';

const ProtectedRoute = () => {
  // If not logged in, redirect to login page
  // This is for the demo purpose
  const isAuthenticated=false;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout />;
};

export default ProtectedRoute;
