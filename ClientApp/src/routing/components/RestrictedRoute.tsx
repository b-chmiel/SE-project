import {Box} from '@chakra-ui/react';
import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {useAuth} from '../../modules/authorization/context/AuthProvider';
import {isAuthenticated} from '../../modules/authorization/helpers/AuthService';
import {Menu} from '../../modules/common/components/Menu/Menu';
import {MENU_HEIGHT, MENU_WIDTH} from '../../modules/common/components/Menu/Menu.constants';
import {AuthenticationRoutes} from '../routes';

type Props = {
    path: string;
    accountType: string;
};

const RestrictedRoute: React.FC<Props> = ({children, path, accountType}) => {
    const history = useHistory();
    const {getRole} = useAuth();

    function getContent() {
        isAuthenticated().then((r) => {
            if (r === false) {
                history.push(AuthenticationRoutes.SIGNIN);
            }
        });
        const role = getRole();
        if (role !== accountType) history.push(AuthenticationRoutes.FORBIDDEN);
        else return children;
    }

    return (
        <>
            <Menu />
            <Box paddingTop={`${MENU_HEIGHT + 24}px`} marginLeft={`${MENU_WIDTH + 24}px`}>
                <Route path={path}>{getContent()}</Route>
            </Box>
        </>
    );
};
export default RestrictedRoute;
