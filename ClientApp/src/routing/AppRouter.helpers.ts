import {UserType} from '../modules/authorization/helpers/AuthService.types';
import {AuthenticationRoutes, ClientRoutes, WorkshopEmployeeRoutes} from './routes';

/**
 * Sets up path which will be used in AppRouter component
 * @returns formatted url path ready to be injected into AppRouter component
 */
export const getBaseName = () => {
    const selector = document?.querySelector('base');
    const baseHref = selector?.getAttribute('href') || '';
    return baseHref.replace(/\$/, '');
};

export const getDefaultRoute = (clientType: UserType) => {
    switch (clientType) {
        case UserType.CLIENT:
            return ClientRoutes.CARS;
        case UserType.WORKSHOP_EMPLOYEE:
            return WorkshopEmployeeRoutes.CASES;
        default:
            return AuthenticationRoutes.SIGNIN;
    }
};
