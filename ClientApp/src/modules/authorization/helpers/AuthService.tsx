import axios from 'axios';
import {API_BASE_PATH, AuthenticationRoutes} from '../../../routing/routes';
import {MockedPhoneNumber, MockedUserType} from './AuthService.mocks';
import {UserSignIn, UserSignUp} from './AuthService.types';

export async function authorize(): Promise<boolean> {
    const creds = localStorage.getItem('creds');
    try {
        const res = await axios.post(API_BASE_PATH + AuthenticationRoutes.USER + AuthenticationRoutes.SIGNIN, JSON.parse(creds || '{}'));
        localStorage.setItem('client_uuid', res.data.guid);
        localStorage.setItem('authorized', 'true');
        return true;
    } catch (error) {
        localStorage.setItem('client_uuid', '');
        localStorage.setItem('authorized', 'false');
        return false;
    }
}

export function saveCreds(username: string, password: string): void {
    var user: UserSignIn = {
        username: username,
        password: password,
    };
    localStorage.setItem('creds', JSON.stringify(user));
}

export function getClientID(): string {
    let creds = localStorage.getItem('client_uuid');
    return creds ? creds : '';
}

export function logout(): void {
    localStorage.removeItem('client_uuid');
    localStorage.removeItem('creds');
    localStorage.setItem('authorized', 'false');
}

export function createUser(username: string, password: string): void {
    const userType = MockedUserType;
    const phoneNumber = MockedPhoneNumber;
    var user: UserSignUp = {
        username,
        password,
        userType,
        name: username,
        surname: username,
        phoneNumber,
    };
    saveCreds(username, password);
    axios
        .post(API_BASE_PATH + AuthenticationRoutes.USER, user)
        .then((res) => res.status) //400 exist, 200 success
        .catch((err) => console.log(err));
}
