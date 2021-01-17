import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { CLIENT_TYPE, WORKSHOP_EMPLOYEE } from '../modules/authorization/helpers/AuthService.types';
import AuthorizationView from '../modules/authorization/views/AuthorizationView/AuthorizationView';
import CreateUserView from '../modules/authorization/views/CreateUserView/CreateUserView';
import NoAccessView from '../modules/authorization/views/NoAccesView';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import {ClientCaseView} from '../modules/client/views/ClientCaseView/ClientCaseView';
import {YourAppointmentsView} from '../modules/client/views/YourAppointmentsView/YourAppointmentsView';
import {InsuranceClient} from '../modules/common/components/InsuranceClientData/InsuranceClientData';
import {CaseView} from '../modules/employee/views/CaseView.tsx/CaseView';
import Cars from '../views/Client/Cars';
import {getBaseName} from './AppRouter.helpers';
import AvailableRoute from './components/AvailableRoute';
import RestrictedRoute from './components/RestrictedRoute';
import {AuthenticationRoutes, ClientRoutes, WorkshopEmployeeRoutes} from './routes';
export const AppRouter: React.FC = () => {
    const basename = getBaseName();

    return (
        <BrowserRouter basename={basename}>
            <Switch>
                <Route path={'/insurance'}>
                    <InsuranceClient personInfo={{name: 'Jan', surname: 'Kowalski', serviceId: 'AX123555', pesel: '90801199662'}} />
                </Route>
                <RestrictedRoute path={ClientRoutes.REPORT_ACCIDENT} accountType={CLIENT_TYPE}>
                    <AppointmentView />
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.CARS} accountType={CLIENT_TYPE} >
                    <Cars props={''}></Cars>
                </RestrictedRoute>
                <RestrictedRoute path={WorkshopEmployeeRoutes.CASE} accountType={WORKSHOP_EMPLOYEE} >
                    <CaseView />
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.CLIENT_CASE} accountType={CLIENT_TYPE} >
                    <ClientCaseView />
                </RestrictedRoute>
                <RestrictedRoute path={ClientRoutes.APPOINTMENTS} accountType={CLIENT_TYPE} >
                    <YourAppointmentsView />
                </RestrictedRoute>
                <AvailableRoute path={AuthenticationRoutes.SIGNIN}>
                    <AuthorizationView />
                </AvailableRoute>
                <AvailableRoute path={AuthenticationRoutes.SIGNUP}>
                    <CreateUserView />
                </AvailableRoute>
                <Route path={'/noaccess'}>
                    <NoAccessView></NoAccessView>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
