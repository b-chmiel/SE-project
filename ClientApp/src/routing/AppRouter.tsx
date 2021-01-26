import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {useAuth} from '../modules/authorization/context/AuthProvider';
import {isAuthenticated} from '../modules/authorization/helpers/AuthService';
import {UserType} from '../modules/authorization/helpers/AuthService.types';
import AuthorizationView from '../modules/authorization/views/AuthorizationView/AuthorizationView';
import CreateUserView from '../modules/authorization/views/CreateUserView/CreateUserView';
import NoAccessView from '../modules/authorization/views/NoAccessView/NoAccesView';
import {AppointmentDetailView} from '../modules/client/views/AppointmentDetailView/AppointmentDetailView';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import CarsView from '../modules/client/views/CarsView/CarsView';
import {YourAppointmentsView} from '../modules/client/views/YourAppointmentsView/YourAppointmentsView';
import {CaseListView} from '../modules/employee/views/CaseListView/CaseListView';
import {CaseView} from '../modules/employee/views/CaseView/CaseView';
import {getBaseName, getDefaultRoute} from './AppRouter.helpers';
import AvailableRoute from './components/AvailableRoute';
import RestrictedRoute from './components/RestrictedRoute';
import {AuthenticationRoutes, ClientRoutes, WorkshopEmployeeRoutes} from './routes';
export const AppRouter: React.FC = () => {
    const basename = getBaseName();
    const {getRole} = useAuth();
    const defaultRoute = getDefaultRoute(getRole());

    return (
        <BrowserRouter basename={basename}>
            <Switch>
                <Route path={'/'} exact>
                    <Redirect to={isAuthenticated() ? defaultRoute : AuthenticationRoutes.SIGNIN} />
                </Route>

                <RestrictedRoute path={ClientRoutes.MAKE_APPOINTMENT} accountType={UserType.CLIENT}>
                    <AppointmentView />
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.CARS} accountType={UserType.CLIENT}>
                    <CarsView></CarsView>
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.CLIENT_CASE} accountType={UserType.CLIENT}>
                    <AppointmentDetailView />
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.APPOINTMENTS} accountType={UserType.CLIENT}>
                    <YourAppointmentsView />
                </RestrictedRoute>

                <RestrictedRoute path={WorkshopEmployeeRoutes.CASE_DETAILS} accountType={UserType.WORKSHOP_EMPLOYEE}>
                    <CaseView />
                </RestrictedRoute>
                <RestrictedRoute path={WorkshopEmployeeRoutes.CASES} accountType={UserType.WORKSHOP_EMPLOYEE}>
                    <CaseListView />
                </RestrictedRoute>

                <AvailableRoute path={AuthenticationRoutes.SIGNIN}>
                    <AuthorizationView />
                </AvailableRoute>
                <AvailableRoute path={AuthenticationRoutes.SIGNUP}>
                    <CreateUserView />
                </AvailableRoute>

                <Route path={AuthenticationRoutes.FORBIDDEN}>
                    <NoAccessView />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
