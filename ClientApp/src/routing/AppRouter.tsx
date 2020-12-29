import React from 'react';
import {getBaseName} from "./AppRouter.helpers";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import StartPageView from "../modules/startPage/views/StartPageView/StartPageView";
import Cars from '../views/Client/Cars';

export const AppRouter: React.FC = () => {
    const basename = getBaseName();
    return (
        <BrowserRouter basename={basename}>
            <Switch>
                <Route path={'/'} exact>
                    <StartPageView/>
                </Route>
                {/* card test component to remove  */}
                <Route path={'/cars'}>
                    <Cars props={""}></Cars>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
