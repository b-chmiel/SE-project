import {UserType} from '../../../../authorization/helpers/AuthService.types';
import {ClientLinks, EmployeeLinks} from './MenuNav.constants';

export function getMenuEntries(user: UserType) {
    switch (user) {
        case UserType.CLIENT:
            return ClientLinks;
        case UserType.WORKSHOP_EMPLOYEE:
            return EmployeeLinks;
        default:
            console.log('Undefined user type!');
            console.log(user);
            return ClientLinks;
    }
}
