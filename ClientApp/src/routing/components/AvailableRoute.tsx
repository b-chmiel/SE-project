import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {ClientRoutes} from '../routes';
import {isAuthenticated} from "../../modules/authorization/helpers/AuthService"

type Props = {
    path: string;
};

const AvailableRoute: React.FC<Props> = ({children, path}) => {
    const history = useHistory();

    function getContent() {
        isAuthenticated().then(r=> {if(r===true)
            history.push(ClientRoutes.CARS)
            }
        )
        return children;
    }

    return <Route path={path}>{getContent()}</Route>;
};
export default AvailableRoute;
