import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {ClientRoutes, WorkshopEmployeeRoutes} from '../routes';
import {getRole, isAuthenticated} from "../../modules/authorization/helpers/AuthService"
import { CLIENT_TYPE, WORKSHOP_EMPLOYEE } from '../../modules/authorization/helpers/AuthService.types';

type Props = {
    path: string;
};

const AvailableRoute: React.FC<Props> = ({children, path}) => {
    const history = useHistory();

    function getContent() {
        isAuthenticated().then(r=> {
            if(r===true){
                getRole().then(a=>{
                    if(a===WORKSHOP_EMPLOYEE){
                        history.push(WorkshopEmployeeRoutes.CASE)
                    }else if(a===CLIENT_TYPE){
                        history.push(ClientRoutes.CARS)
                    }
                });
            }
        });
        return children;
    }

    return <Route path={path}>{getContent()}</Route>;
};
export default AvailableRoute;
