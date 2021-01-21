export interface Visit {
    visitId: number;
    date: string;
    price: number;
    requiredActions: string[];
    licensePlate: string;
    priority: VisitPriority;
    type: VisitType;
    status: VisitStatus;
    assignedEmployees: VisitEmployeeInfo[];
    carOwnerUsername: string;
}

export interface VisitToPost {
    date: string;
    requiredActions: string[];
    licensePlate: string;
    priority: string;
    type: string;
}

export enum VisitPriority {
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    EMERGENCY = 'EMERGENCY',
}

export enum VisitType {
    PREVENTIVE_MAINTENANCE_SERVICE = 'PREVENTIVE MAINTENANCE SERVICE',
    RUNNING_REPAIRS = 'RUNNING REPAIRS',
    BODY_REPAIR = 'BODY REPAIR',
    AIR_CONDITIONING_SYSTEM = 'AIR CONDITIONING SYSTEM',
    CAR_CARE = 'CAR CARE',
    WARRANTY_REPAIRS = 'WARRANTY REPAIRS',
    WHEEL_CARE = 'WHEEL CARE',
    ACCIDENT_REPAIR = 'ACCIDENT REPAIR',
}

export enum VisitStatus {
    ATSERVICE = 'AT SERVICE',
    REPAIRED = 'REPAIRED',
    CHECKEDIN = 'CHECKED IN',
    DIAGNOSE = 'DIAGNOSE',
    PAID = 'PAID',
}

export interface VisitEmployeeInfo {
    employeeId: number;
    name: string;
    surname: string;
}
