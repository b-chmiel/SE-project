export enum ClientRoutes {
    REPORT_ACCIDENT = '/report-accident',
    PROFILE = '/profile',
    CARS = '/cars',
    APPOINTMENTS = '/appointments',
    HISTORY = '/history',
    CLIENT_CASE = '/client-case/:caseId',
    APPOINTMENT_DETAILS = '/appointment-details',
}

export enum WorkshopEmployeeRoutes {
    CASE_DETAILS = '/case/:caseId',
    SCHEDULE = '/schedule',
    CLIENTS = '/clients',
    CASES = '/case',
}

export enum InsuranceEmployeeRoutes {
    CLIENTS = '/clients',
    OFFERS = '/offers',
    INSURANCES = '/insurances',
}

export enum AuthenticationRoutes {
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    USER = '/users',
    FORBIDDEN = '/forbidden',
}

export const API_BASE_PATH = '/api/0.1.1';
