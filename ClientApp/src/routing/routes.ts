export enum ClientRoutes {
    REPORT_ACCIDENT = '/report-accident',
    PROFILE = '/profile',
    CARS = '/cars',
    APPOINTMENTS = '/appointments',
    HISTORY = '/history',
    CLIENT_CASE = '/client-case/:caseId',
}

export enum WorkshopEmployeeRoutes {
    CASE = '/case/:caseId',
    SCHEDULE = '/schedule',
    ORDERS = '/orders',
    PARTS_SHOP = '/parts-shop',
    CLIENTS = '/clients',
    HISTORY = '/history',
}

export enum InsuranceEmployeeRoutes {
    CLIENTS = '/clients',
    OFFERS = '/offers',
    INSURANCES = '/insurances',
}

export enum AuthenticationRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    USER = '/user',
}

export const API_BASE_PATH = '/api/0.1.1';
