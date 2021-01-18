export interface MakeAppointmentData {
    date: Date;
    actions: string[];
    time: string; //format: hh:mm
    priority: AppointmentPriority;
    type: AppointmentType;
}

export enum AppointmentPriority {
    LOW,
    MEDIUM,
    HIGH,
    EMERGENCY,
}

export const AppointmentPriorityNames = ['Low', 'Medium', 'High', 'Emergency'];

export enum AppointmentType {
    PREVENTIVE_MAINTENANCE_SERVICE,
    RUNNING_REPAIRS,
    BODY_REPAIR,
    AIR_CONDITIONING_SYSTEM,
    CAR_CARE,
    WARRANTY_REPAIRS,
    WHEEL_CARE,
    ACCIDENT_REPAIR,
}

export const AppointmentTypeNames = [
    'Preventive maintenance',
    'Running repairs',
    'Body repair',
    'Air conditioning repair',
    'Car care service',
    'Warranty repairs',
    'Wheel care',
    'Accident repairs',
];
