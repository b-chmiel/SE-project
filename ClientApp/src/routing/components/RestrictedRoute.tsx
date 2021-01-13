import {Box} from '@chakra-ui/react';
import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {Menu} from '../../modules/common/components/Menu/Menu';
import {MENU_HEIGHT, MENU_WIDTH} from '../../modules/common/components/Menu/Menu.constants';
import {AuthenticationRoutes} from '../routes';

type Props = {
    path: string;
};

const RestrictedRoute: React.FC<Props> = ({children, path}) => {
    const history = useHistory();
    const isAuthenticated = localStorage.getItem('authorized') === 'true';

    function getContent() {
        if (!isAuthenticated) {
            history.push(AuthenticationRoutes.SIGNIN);
        }
        return children;
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
