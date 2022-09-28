import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = () => {
    const { token, email } = useAuth();
    return !token || !email ? <Outlet /> : <Navigate to="/" replace={true} />;
};
