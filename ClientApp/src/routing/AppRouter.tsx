import {Box} from '@chakra-ui/react';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppointmentView} from '../modules/client/views/AppointmentView/AppointmentView';
import AddCarButton from '../modules/common/components/CarCard/AddCar';
import CarCard from '../modules/common/components/CarCard/CarCard';
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
                {/*TODO remove this. This is only for testing car component*/}
                <Route path={'/cars'}>
                    <Box>
                        <AddCarButton></AddCarButton>
                        <CarCard
                            state={2}
                            model="OPEL ASTRA"
                            type="SEDAN"
                            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed. Sit amet est placerat in egestas erat imperdiet sed euismod. Rhoncus dolor purus non enim praesent elementum facilisis leo vel."
                        ></CarCard>
                        <CarCard
                            state={1}
                            model="VOLKSVAGEN PASSAT"
                            type="SEDAN"
                            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed. Sit amet est placerat in egestas erat imperdiet sed euismod. Rhoncus dolor purus non enim praesent elementum facilisis leo vel."
                        ></CarCard>
                    </Box>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
