import axios from 'axios';
import {ApiRoutes, API_BASE_PATH} from '../../../routing/routes';
import {Car, DiagnosticProfile} from './carAPI.types';

const authHeader = {
    headers: {
        Guid: localStorage.getItem('client_uuid'),
    },
};

export function getCars(): Promise<Car[] | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.CARS, authHeader)
        .then((response) => response.data)
        .catch(() => null);
}

export function getCar(licensePlate: string): Promise<Car | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.CARS + '/' + licensePlate, authHeader)
        .then((response) => response.data)
        .catch(() => null);
}

export function getDiagnosticProfile(licensePlate: string): Promise<DiagnosticProfile | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.DIAGNOSTIC_PROFILE.replace('{licensePlate}', licensePlate), authHeader)
        .then((response) => response.data)
        .catch(() => null);
}
