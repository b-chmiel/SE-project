import React from 'react';
import {Route, useHistory} from 'react-router-dom';


type RestrictedRouteProps = {
    path: string
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({children, path}) => {
    const history = useHistory();
    const authorized = localStorage.getItem("authorized")
 
    function getContent () {
        if(authorized==="true"){
            history.push("/cars")
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