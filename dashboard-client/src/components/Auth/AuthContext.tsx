import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { IAuth } from '../../app/types';

const authContextDefault: IAuth = {
    token: null,
    email: null,
    handleLogin: () => null,
    handleLogout: () => null
};

const AuthContext = createContext<IAuth>(authContextDefault);

export const AuthProvider = ({ children }: { children: JSX.Element[] }) => {
    const serverData = useAppSelector((state) => state.auth.data);
    const navigate = useNavigate();
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleLogin = async () => {
        const token = serverData?.token;
        const email = serverData?.email;
        if (token && email) {
            console.log(token);
            console.log(email);
            setToken(token);
            setEmail(email);
        } else {
            console.log('no token or email!');
        }
    };

    const handleLogout = () => {
        setToken('');
        setEmail('');
        navigate('/');
    };

    const value = {
        token,
        email,
        handleLogin,
        handleLogout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
