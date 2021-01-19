import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {useAuth} from '../../modules/authorization/context/AuthProvider';
import {isAuthenticated} from '../../modules/authorization/helpers/AuthService';
import {UserType} from '../../modules/authorization/helpers/AuthService.types';
import {ClientRoutes, WorkshopEmployeeRoutes} from '../routes';

type Props = {
    path: string;
};

const AvailableRoute: React.FC<Props> = ({children, path}) => {
    const history = useHistory();
    const {getRole} = useAuth();

    function getContent() {
        isAuthenticated().then((response) => {
            if (response === true) {
                const role = getRole();
                if (role === UserType.WORKSHOP_EMPLOYEE) {
                    history.push(WorkshopEmployeeRoutes.CASES);
                } else if (role === UserType.CLIENT) {
                    history.push(ClientRoutes.CARS);
                }
            }
        });
        return children;
    }

    return <Route path={path}>{getContent()}</Route>;
};

export default AvailableRoute;
