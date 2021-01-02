import {ClientRoutes, InsuranceEmployeeRoutes, WorkshopEmployeeRoutes} from '../../../../../routing/routes';
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
    {
        title: 'APPOINTMENTS HISTORY',
        path: ClientRoutes.HISTORY,
    },
];

export const EmployeeLinks: Link<WorkshopEmployeeRoutes>[] = [
    {
        title: 'SCHEDULE',
        path: WorkshopEmployeeRoutes.SCHEDULE,
    },
    {
        title: 'ORDERS',
        path: WorkshopEmployeeRoutes.ORDERS,
    },
    {
        title: 'PARTS SHOP',
        path: WorkshopEmployeeRoutes.PARTS_SHOP,
    },
    {
        title: 'CLIENTS',
        path: WorkshopEmployeeRoutes.CLIENTS,
    },
    {
        title: 'HISTORY',
        path: WorkshopEmployeeRoutes.HISTORY,
    },
];

export const InsuranceEmployeeLinks: Link<InsuranceEmployeeRoutes>[] = [
    {
        title: 'CLIENTS',
        path: InsuranceEmployeeRoutes.CLIENTS,
    },
    {
        title: 'OFFERS',
        path: InsuranceEmployeeRoutes.OFFERS,
    },
    {
        title: 'INSURANCES',
        path: InsuranceEmployeeRoutes.INSURANCES,
    },
];
