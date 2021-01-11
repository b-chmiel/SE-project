import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import AuthorizationView from '../modules/authorization/views/AuthorizationView/AuthorizationView';
import CreateUserView from '../modules/authorization/views/CreateUserView/CreateUserView';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import {ClientCaseView} from '../modules/client/views/ClientCaseView/ClientCaseView';
import {CaseView} from '../modules/employee/views/CaseView.tsx/CaseView';
import Cars from '../views/Client/Cars';
import {getBaseName} from './AppRouter.helpers';
import AvailableRoute from './components/AvailableRoute';
import RestrictedRoute from './components/RestrictedRoute';
import {AuthenticationRoutes, ClientRoutes, WorkshopEmployeeRoutes} from './routes';

export const AppRouter: React.FC = () => {
    const basename = getBaseName();
    const isAuthenticated = localStorage.getItem('authorized') === 'true';

    return (
        <BrowserRouter basename={basename}>
            <Switch>
                <Route path={'/'} exact>
                    <AppointmentView />
                    {isAuthenticated ? <Redirect to={ClientRoutes.REPORT_ACCIDENT} /> : <AuthorizationView />}
                </Route>
                <RestrictedRoute path={ClientRoutes.REPORT_ACCIDENT}>
                    <AppointmentView />
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.CARS}>
                    <Cars props={''}></Cars>
                </RestrictedRoute>
                <RestrictedRoute path={WorkshopEmployeeRoutes.CASE}>
                    <CaseView />
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.CLIENT_CASE}>
                    <ClientCaseView />
                </RestrictedRoute>
                <AvailableRoute path={AuthenticationRoutes.SIGNIN}>
                    <AuthorizationView />
                </AvailableRoute>
                <AvailableRoute path={AuthenticationRoutes.SIGNUP}>
                    <CreateUserView />
                </AvailableRoute>
            </Switch>
        </BrowserRouter>
    );
};
