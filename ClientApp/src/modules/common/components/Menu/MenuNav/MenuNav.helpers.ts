import {ClientLinks, EmployeeLinks, InsuranceEmployeeLinks} from './MenuNav.constants';
import {UserType} from './MenuNav.mocks';

export function getMenuEntries(user: UserType) {
    switch (user) {
        case UserType.CLIENT:
            return ClientLinks;
        case UserType.WORKSHOP_EMPLOYEE:
            return EmployeeLinks;
        case UserType.INSURANCE_EMPLOYEE:
            return InsuranceEmployeeLinks;
        default:
            console.log('Undefined user type!');
            console.log(user);
            return ClientLinks;
    }
}
