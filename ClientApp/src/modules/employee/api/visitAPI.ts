import axios from 'axios';
import {ApiRoutes, API_BASE_PATH} from '../../../routing/routes';
import {Visit} from './visitAPI.types';

const authHeader = {
    headers: {
        Guid: localStorage.getItem('client_uuid'),
    },
};

export function getVisits(): Promise<Visit[] | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.VISITS, authHeader)
        .then((response) => response.data)
        .catch(() => null);
}

export function getVisit(visitId: number): Promise<Visit | null> {
    return axios
        .get(`${API_BASE_PATH}${ApiRoutes.VISITS}/${visitId}`, authHeader)
        .then((response) => response.data)
        .catch(() => null);
}

//TODO change to putVisit type

export function putVisit(visitInfo: Visit): Promise<any | null> {
    return axios
        .put(`${API_BASE_PATH}${ApiRoutes.VISITS}`, visitInfo, authHeader)
        .then((response) => response.data)
        .catch(() => null);
}

export function putVisitRepair(visitId: number): Promise<any | null> {
    return axios
        .put(API_BASE_PATH + ApiRoutes.VISIT_REPAIR.replace('{visitId}', visitId.toString()), authHeader)
        .then((response) => response.data)
        .catch(() => null);
}

export function putVisitMaintain(visitId: number): Promise<any | null> {
    return axios
        .put(API_BASE_PATH + ApiRoutes.VISIT_MAINTAIN.replace('{visitId}', visitId.toString()), authHeader)
        .then((response) => response.data)
        .catch(() => null);
}

export function putVisitDiagnose(visitId: number): Promise<any | null> {
    return axios
        .put(API_BASE_PATH + ApiRoutes.VISIT_DIAGNOSE.replace('{visitId}', visitId.toString()), authHeader)
        .then((response) => response.data)
        .catch(() => null);
}
