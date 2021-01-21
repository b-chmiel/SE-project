import axios from 'axios';
import {ApiRoutes, API_BASE_PATH} from '../../../routing/routes';
import {Car, DiagnosticProfile} from './carAPI.types';

export function getCars(): Promise<Car[] | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.CARS, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function getCar(licensePlate: string): Promise<Car | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.CARS + '/' + licensePlate, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function getDiagnosticProfile(licensePlate: string): Promise<DiagnosticProfile | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.DIAGNOSTIC_PROFILE.replace('{licensePlate}', licensePlate), {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}
