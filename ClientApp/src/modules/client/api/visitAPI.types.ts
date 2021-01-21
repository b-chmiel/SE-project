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
    PREVENTIVE_MAINTENANCE_SERVICE = 'PREVENTIVE_MAINTENANCE_SERVICE',
    RUNNING_REPAIRS = 'RUNNING_REPAIRS',
    BODY_REPAIR = 'BODY_REPAIR',
    AIR_CONDITIONING_SYSTEM = 'AIR_CONDITIONING_SYSTEM',
    CAR_CARE = 'CAR_CARE',
    WARRANTY_REPAIRS = 'WARRANTY_REPAIRS',
    WHEEL_CARE = 'WHEEL_CARE',
    ACCIDENT_REPAIR = 'ACCIDENT_REPAIR',
}

export enum VisitStatus {
    ATSERVICE = 'ATSERVICE',
    REPAIRED = 'REPAIRED',
    CHECKEDIN = 'CHECKEDIN',
    DIAGNOSE = 'DIAGNOSE',
    PAID = 'PAID',
}

export interface VisitEmployeeInfo {
    employeeId: number;
    name: string;
    surname: string;
}
