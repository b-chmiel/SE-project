import {Box} from '@chakra-ui/react';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import {Menu} from '../modules/common/components/Menu/Menu';
import {MENU_HEIGHT, MENU_WIDTH} from '../modules/common/components/Menu/Menu.constants';
import Cars from '../views/Client/Cars';
import {getBaseName} from './AppRouter.helpers';
import {ClientRoutes} from './routes';

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
                    <Route path={'/cars'}>
                        <Cars props={''}></Cars>
                    </Route>
                </Switch>
            </Box>
        </BrowserRouter>
    );
};
