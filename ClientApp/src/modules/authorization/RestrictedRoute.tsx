import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {AuthenticationRoot} from '../../routing/routes'


type RestrictedRouteProps = {
    path: string
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({children, path}) => {
    const history = useHistory();
 
    function getContent () {
        if(localStorage.getItem("authorized")==="false"){
            history.push(AuthenticationRoot.SIGNIN)
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