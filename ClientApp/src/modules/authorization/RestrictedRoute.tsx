import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import AuthService from './AuthService';


type RestrictedRouteProps = {
    path: string
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({children, path}) => {
    const history = useHistory();
    const authorized = AuthService.authorize();
 
    function getContent () {
        if(authorized!==true){
            history.push('/signin')
        }
        return children;
    }

    return (
        <Route path={path}>
            {getContent()}
        </Route>

    );
};
export default RestrictedRoute;