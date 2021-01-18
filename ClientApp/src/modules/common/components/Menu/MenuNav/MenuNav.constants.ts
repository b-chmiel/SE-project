import {ClientRoutes, WorkshopEmployeeRoutes} from '../../../../../routing/routes';
import {Link} from './MenuNav.types';

export const ClientLinks: Link<ClientRoutes>[] = [
    {
        title: 'YOUR PROFILE',
        path: ClientRoutes.PROFILE,
    },
    {
        title: 'YOUR CARS',
        path: ClientRoutes.CARS,
    },
    {
        title: 'YOUR APPOINTMENTS',
        path: ClientRoutes.APPOINTMENTS,
    },
];

export const EmployeeLinks: Link<WorkshopEmployeeRoutes>[] = [
    {
        title: 'SCHEDULE',
        path: WorkshopEmployeeRoutes.SCHEDULE,
    },
    {
        title: 'CASES',
        path: WorkshopEmployeeRoutes.CASES,
    },
];
