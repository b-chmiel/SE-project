import { Button } from '@chakra-ui/react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from './AuthService';

const LogoutButton: React.FC<{}> = () => {
    const history = useHistory();
 
    function logout () {
        AuthService.logout()
        history.push('/signin')
    }

    return (
        <Button onClick={logout}>
            Logout
        </Button>
    );
};
export default LogoutButton;