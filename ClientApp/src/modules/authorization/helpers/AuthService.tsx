import axios from 'axios';
import {ApiRoutes, API_BASE_PATH, AuthenticationRoutes} from '../../../routing/routes';
import {UserSignIn, UserSignUp, UserType} from './AuthService.types';

export async function authorize(userCreds: UserSignIn): Promise<boolean> {
    try {
        const res = await axios.post(API_BASE_PATH + ApiRoutes.USERS + AuthenticationRoutes.SIGNIN, userCreds);
        localStorage.setItem('client_uuid', res.data.guid);
        localStorage.setItem('account_type', res.data.role);
        return true;
    } catch (error) {
        localStorage.setItem('client_uuid', '');
        localStorage.setItem('account_type', '');
        return false;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    return localStorage.getItem('client_uuid') !== null;
}

export function getClientID(): string {
    const creds = localStorage.getItem('client_uuid');
    return creds ? creds : '';
}

export function logout(): void {
    localStorage.removeItem('client_uuid');
    localStorage.removeItem('account_type');
}

export async function createUser(
    name: string,
    surname: string,
    username: string,
    password: string,
    type: UserType,
    telephone: string,
): Promise<boolean> {
    const userType = type;
    const phoneNumber = telephone;
    const user: UserSignUp = {
        username,
        password,
        userType,
        name,
        surname,
        phoneNumber,
    };
    return axios
        .post(API_BASE_PATH + ApiRoutes.USERS, user)
        .then((res) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
}
