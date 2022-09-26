import { createContext, useState, useContext } from 'react';
import { IAuth } from '../../app/types';

const authContextDefault: IAuth = {
    token: null,
    handleLogin: () => null,
    handleLogout: () => null
};

const AuthContext = createContext<IAuth>(authContextDefault);

export const AuthProvider = ({ children }: { children: JSX.Element[] }) => {
    const [token, setToken] = useState(null);

    const handleLogin = async () => {
        // const token = await fakeAuth();

        setToken(token);
    };

    const handleLogout = () => {
        setToken(null);
    };

    const value = {
        token,
        handleLogin,
        handleLogout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
