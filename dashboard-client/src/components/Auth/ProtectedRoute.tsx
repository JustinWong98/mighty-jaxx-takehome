import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/" replace={true} />;
    }
    return children;
};
