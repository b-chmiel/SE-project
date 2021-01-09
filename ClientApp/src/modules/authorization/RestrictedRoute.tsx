import React from 'react';
import {Route, useHistory} from 'react-router-dom';


type RestrictedRouteProps = {
    path: string
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({children, path}) => {
    const history = useHistory();
 
    function getContent () {
        if(localStorage.getItem("authorized")==="false"){
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