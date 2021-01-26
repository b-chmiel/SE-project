export interface Car {
    licensePlate: string;
    model: string;
    type: CarType;
}

export enum CarType {
    sedan = 'sedan',
    hatchback = 'hatchback',
    SUV = 'SUV',
    truck = 'truck',
    compact = 'compact',
}

export interface DiagnosticProfile {
    licensePlate: string;
    engine: string;
    body: string;
    lowVoltage: string;
    lighting: string;
    brakes: string;
    sensors: string;
    miscellaneous: string[];
    conditioning: string;
}
