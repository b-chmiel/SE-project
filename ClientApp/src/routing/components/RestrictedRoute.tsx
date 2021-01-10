import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {AuthenticationRoutes} from '../routes';

type Props = {
    path: string;
};

const RestrictedRoute: React.FC<Props> = ({children, path}) => {
    const history = useHistory();

    function getContent() {
        if (localStorage.getItem('authorized') === 'false') {
            history.push(AuthenticationRoutes.SIGNIN);
        }
        return children;
    }

    return <Route path={path}>{getContent()}</Route>;
};
export default RestrictedRoute;
