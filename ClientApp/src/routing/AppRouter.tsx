import React from 'react';
import {getBaseName} from "./AppRouter.helpers";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import StartPageView from "../modules/startPage/views/StartPageView/StartPageView";
import CarCard from '../components/CarCard/CarCard';

export const AppRouter: React.FC = () => {
    const basename = getBaseName();
    return (
        <BrowserRouter basename={basename}>
            <Switch>
                <Route path={'/'} exact>
                    <StartPageView/>
                </Route>
                {/* card test component to remove  */}
                <Route path={'/card'}>
                    <CarCard 
                        state={2}
                        model="OPEL ASTRA"
                        type="SEDAN"
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed. Sit amet est placerat in egestas erat imperdiet sed euismod. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Praesent semper feugiat nibh sed pulvinar"
                    ></CarCard>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
