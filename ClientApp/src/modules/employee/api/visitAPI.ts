import axios from 'axios';
import {ApiRoutes, API_BASE_PATH} from '../../../routing/routes';
import {Visit} from './visitAPI.types';

export function getVisits(): Promise<Visit[] | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.VISITS, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function getVisit(visitId: number): Promise<Visit | null> {
    return axios
        .get(`${API_BASE_PATH}${ApiRoutes.VISITS}/${visitId}`, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

//TODO change to putVisit type

export function putVisit(visitInfo: Visit): Promise<any | null> {
    return axios
        .put(`${API_BASE_PATH}${ApiRoutes.VISITS}`, visitInfo, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function putVisitRepair(visitId: number): Promise<any | null> {
    return axios
        .put(API_BASE_PATH + ApiRoutes.VISIT_REPAIR.replace('{visitId}', visitId.toString()), undefined, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function putVisitMaintain(visitId: number): Promise<any | null> {
    return axios
        .put(API_BASE_PATH + ApiRoutes.VISIT_MAINTAIN.replace('{visitId}', visitId.toString()), undefined, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function putVisitDiagnose(visitId: number): Promise<any | null> {
    return axios
        .put(API_BASE_PATH + ApiRoutes.VISIT_DIAGNOSE.replace('{visitId}', visitId.toString()), undefined, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}
