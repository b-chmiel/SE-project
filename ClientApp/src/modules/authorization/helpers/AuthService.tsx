import axios from 'axios';
import {API_BASE_PATH, AuthenticationRoutes} from '../../../routing/routes';
import {UserSignIn, UserSignUp} from './AuthService.types';

export async function authorize(userCreds: UserSignIn): Promise<boolean> {
    try {
        const res = await axios.post(API_BASE_PATH + AuthenticationRoutes.USER + AuthenticationRoutes.SIGNIN, userCreds);
        localStorage.setItem('client_uuid', res.data.guid);
        return true;
    } catch (error) {
        localStorage.setItem('client_uuid', '');
        return false;
    }
}


export async function isAuthenticated(): Promise<boolean>{
    return localStorage.getItem('client_uuid')===null? false:true;
}

export function getClientID(): string {
    let creds = localStorage.getItem('client_uuid');
    return creds ? creds : '';
}

export function logout(): void {
    localStorage.removeItem('client_uuid');
}

export function createUser(name: string, surname: string, username: string, password: string, type: string, telphone: string): void {
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
    axios
        .post(API_BASE_PATH + AuthenticationRoutes.USER, user)
        .then((res) => {
                localStorage.setItem('client_uuid', res.data.guid)
            }
        ) //400 exist, 200 success
        .catch((err) => console.log(err));
}
