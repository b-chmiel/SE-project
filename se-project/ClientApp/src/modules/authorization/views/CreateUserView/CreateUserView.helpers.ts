import {UserType} from '../../helpers/AuthService.types';

export function getUserType(userToggle: boolean): UserType {
    return userToggle ? UserType.WORKSHOP_EMPLOYEE : UserType.CLIENT;
}
