import {useState} from 'react';
import {getCar, getCars, getDiagnosticProfile} from '../api/carAPI';
import {Car, DiagnosticProfile} from '../api/carAPI.types';

export function useCar() {
    const [cars, setCars] = useState<Car[] | null>(null);
    const [car, setCar] = useState<Car | null>(null);
    const [diagnosticProfile, setDiagnosticProfile] = useState<DiagnosticProfile | null>(null);
    const [isFetching, setFetching] = useState(false);

    async function fetchCars(): Promise<boolean> {
        setFetching(true);

        const response = await getCars();
        if (response !== null) {
            setCars(response);
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function fetchCar(licensePlate: string): Promise<boolean> {
        setFetching(true);

        const response = await getCar(licensePlate);
        if (response !== null) {
            setCar(response);
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function fetchDiagnosticProfile(licensePlate: string): Promise<boolean> {
        setFetching(true);

        const response = await getDiagnosticProfile(licensePlate);
        if (response !== null) {
            setDiagnosticProfile(response);
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    return {isFetching, cars, car, diagnosticProfile, fetchCars, fetchCar, fetchDiagnosticProfile};
}
