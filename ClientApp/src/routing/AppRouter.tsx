import {Box} from '@chakra-ui/react';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthorizationView from '../modules/authorization/views/AuthorizationView/AuthorizationView';
import CreateUserView from '../modules/authorization/views/CreateUserView/CreateUserView';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import {ClientCaseView} from '../modules/client/views/ClientCaseView/ClientCaseView';
import {Menu} from '../modules/common/components/Menu/Menu';
import {MENU_HEIGHT, MENU_WIDTH} from '../modules/common/components/Menu/Menu.constants';
import {CaseView} from '../modules/employee/views/CaseView.tsx/CaseView';
import Cars from '../views/Client/Cars';
import {getBaseName} from './AppRouter.helpers';
import AvailableRoute from './components/AvailableRoute';
import RestrictedRoute from './components/RestrictedRoute';
import {ClientRoutes, WorkshopEmployeeRoutes} from './routes';

export const AppRouter: React.FC = () => {
    const basename = getBaseName();
    return (
        <BrowserRouter basename={basename}>
            <Menu />
            <Box paddingTop={`${MENU_HEIGHT + 24}px`} marginLeft={`${MENU_WIDTH + 24}px`}>
                <Switch>
                    <Route path={'/'} exact>
                        <AppointmentView />
                    </Route>
                    <Route path={ClientRoutes.REPORT_ACCIDENT}>
                        <AppointmentView />
                    </Route>
                    {/*TODO remove this. This is only for testing car component*/}
                    <RestrictedRoute path={'/cars'}>
                        <Cars props={''}></Cars>
                    </RestrictedRoute>
                    <Route path={WorkshopEmployeeRoutes.CASE}>
                        <CaseView />
                    </Route>
                    <Route path={ClientRoutes.CLIENT_CASE}>
                        <ClientCaseView />
                    </Route>
                    <AvailableRoute path="/signin">
                        <AuthorizationView />
                    </AvailableRoute>
                    <AvailableRoute path="/signup">
                        <CreateUserView />
                    </AvailableRoute>
                </Switch>
            </Box>
        </BrowserRouter>
    );
};
