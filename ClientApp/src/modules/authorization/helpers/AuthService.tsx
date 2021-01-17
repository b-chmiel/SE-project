import axios from 'axios';
import {API_BASE_PATH, AuthenticationRoutes} from '../../../routing/routes';
import {UserSignIn, UserSignUp} from './AuthService.types';

export async function authorize(userCreds: UserSignIn): Promise<boolean> {
    try {
        const res = await axios.post(API_BASE_PATH + AuthenticationRoutes.USER + AuthenticationRoutes.SIGNIN, userCreds);
        localStorage.setItem('client_uuid', res.data.guid);
        localStorage.setItem('account_type', res.data.role)
        return true;
    } catch (error) {
        localStorage.setItem('client_uuid', '');
        localStorage.setItem('account_type', '')
        return false;
    }
}


export async function isAuthenticated(): Promise<boolean>{
    return localStorage.getItem('client_uuid')===null? false:true;
}

export async function getRole(): Promise<string>{
    let accountType = localStorage.getItem('account_type');
    return accountType===null?'':accountType
}
export function getClientID(): string {
    let creds = localStorage.getItem('client_uuid');
    return creds ? creds : '';
}

export function logout(): void {
    localStorage.removeItem('client_uuid');
    localStorage.removeItem('account_type');
}

export async function createUser(name: string, surname: string, username: string, password: string, type: string, telphone: string): Promise<boolean> {
    const userType = type;
    const phoneNumber = telphone;
    var user: UserSignUp = {
        username,
        password,
        userType,
        name,
        surname,
        phoneNumber,
    };
    return axios
        .post(API_BASE_PATH + AuthenticationRoutes.USER, user)
        .then((res) => {
            return true;
        }
        ) 
        .catch((err) => {
            return false;
        });
}
