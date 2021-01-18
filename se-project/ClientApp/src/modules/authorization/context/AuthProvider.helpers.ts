import {UserType} from '../helpers/AuthService.types';

export function getAccountType(rawType: string): UserType {
    switch (rawType) {
        case '':
            return UserType.NOT_AUTHENTICATED;
        case 'CLIENT':
            return UserType.CLIENT;
        case 'WORKSHOP_EMPLOYEE':
            return UserType.WORKSHOP_EMPLOYEE;
        default:
            return UserType.NOT_AUTHENTICATED;
    }
}
