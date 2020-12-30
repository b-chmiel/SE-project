import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import Cars from '../views/Client/Cars';
import {getBaseName} from './AppRouter.helpers';
import {Routes} from './routes';

export const AppRouter: React.FC = () => {
    const basename = getBaseName();
    return (
        <BrowserRouter basename={basename}>
            <Switch>
                <Route path={'/'} exact>
                    <AppointmentView />
                </Route>
                <Route path={Routes.MAKE_APPOINTMENT}>
                    <AppointmentView />
                </Route>
                {/* card test component to remove  */}
                <Route path={'/cars'}>
                    <Cars props={''}></Cars>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
