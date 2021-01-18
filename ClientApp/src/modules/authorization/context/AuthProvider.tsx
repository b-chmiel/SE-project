import React, {createContext, useContext} from 'react';
import {UserType} from '../helpers/AuthService.types';

interface Context {
    getRole: () => UserType;
}

const AuthContext = createContext<Context>({
    getRole: () => UserType.NOT_AUTHENTICATED,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({children}) => {
    function getRole(): UserType {
        const accountType = localStorage.getItem('account_type');
        return accountType === null ? UserType.NOT_AUTHENTICATED : UserType[accountType as keyof typeof UserType];
    }

    return <AuthContext.Provider value={{getRole}}>{children}</AuthContext.Provider>;
};
