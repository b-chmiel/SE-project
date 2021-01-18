export interface UserSignUp {
    username: string;
    password: string;
    userType: string;
    name: string;
    surname: string;
    phoneNumber: string;
}
export interface UserSignIn {
    username: string;
    password: string;
}

export enum UserType {
    CLIENT = 'CLIENT',
    WORKSHOP_EMPLOYEE = 'WORKSHOP_EMPLOYEE',
    NOT_AUTHENTICATED = '',
}
