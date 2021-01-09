import {Box} from '@chakra-ui/react';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import {Menu} from '../modules/common/components/Menu/Menu';
import {MENU_HEIGHT, MENU_WIDTH} from '../modules/common/components/Menu/Menu.constants';
import {CaseView} from '../modules/employee/views/CaseView.tsx/CaseView';
import Cars from '../views/Client/Cars';
import {getBaseName} from './AppRouter.helpers';
import {ClientRoutes, WorkshopEmployeeRoutes} from './routes';
import RestrictedRoute from '../modules/authorization/RestrictedRoute';
import AuthorizationPage from '../modules/authorization/View/AuthorizationPage';
import CreateUserPage from '../modules/authorization/View/CreateUserPage';
import AvailableRoute from '../modules/authorization/AvailableRoute';

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
                    <RestrictedRoute path={'/cars'} >
                        <Cars props={''}></Cars>
                    </RestrictedRoute>
                    <Route path={WorkshopEmployeeRoutes.CASE}>
                        <CaseView />
                    </Route>
                    <AvailableRoute path="/signin">
                        <AuthorizationPage/>
                    </AvailableRoute>
                    <AvailableRoute path="/signup">
                        <CreateUserPage/>
                    </AvailableRoute>
                </Switch>
            </Box>
        </BrowserRouter>
    );
};
