import { Button } from '@chakra-ui/react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {AuthenticationRoot} from '../../routing/routes'
import { logout } from './AuthService';

const LogoutButton: React.FC<{}> = () => {
    const history = useHistory();
 
    function signout () {
        logout()
        history.push(AuthenticationRoot.SIGNIN)
    }

    return (
        <Button onClick={signout}>
            Logout
        </Button>
    );
};
export default LogoutButton;