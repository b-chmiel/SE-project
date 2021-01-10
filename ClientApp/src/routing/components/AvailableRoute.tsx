import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {ClientRoutes} from '../routes';

type Props = {
    path: string;
};

const AvailableRoute: React.FC<Props> = ({children, path}) => {
    const history = useHistory();
    const authorized = localStorage.getItem('authorized');

    function getContent() {
        if (authorized === 'true') {
            history.push(ClientRoutes.CARS);
        }

        return children;
    }

    return <Route path={path}>{getContent()}</Route>;
};
export default AvailableRoute;
