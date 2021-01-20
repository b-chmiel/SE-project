export enum ClientRoutes {
    MAKE_APPOINTMENT = '/appointment/:licensePlate',
    PROFILE = '/profile',
    CARS = '/cars',
    APPOINTMENTS = '/appointments',
    HISTORY = '/history',
    CLIENT_CASE = '/client-case/:visitId',
    APPOINTMENT_DETAILS = '/appointment-details',
}

export enum WorkshopEmployeeRoutes {
    CASE_DETAILS = '/case/:visitId',
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
    FORBIDDEN = '/forbidden',
}

export const API_BASE_PATH = '/api/0.1.1';

export enum ApiRoutes {
    CARS = '/cars',
    USERS = '/users',
    VISITS = '/visits',
    DIAGNOSTIC_PROFILE = '/cars/{licensePlate}/profile',
    VISIT_REPAIR = '/visits/{visitId}/repair',
    VISIT_MAINTAIN = '/visits/{visitId}/maintain',
    VISIT_DIAGNOSE = '/visits/{visitId}/diagnose',
    VISIT_PAY = '/visits/{visitId}/pay',
}
