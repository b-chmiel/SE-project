import {Button} from '@chakra-ui/react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {AuthenticationRoutes} from '../../../../routing/routes';
import {logout} from '../../helpers/AuthService';

const LogoutButton: React.FC = () => {
    const history = useHistory();

    function signout() {
        logout();
        history.push(AuthenticationRoutes.SIGNIN);
    }

    return <Button onClick={signout}>Logout</Button>;
};
export default LogoutButton;
