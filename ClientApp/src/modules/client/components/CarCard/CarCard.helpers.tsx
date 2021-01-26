import {Box} from '@chakra-ui/react';
import {FormikErrors} from 'formik';
import React from 'react';
import {Car} from '../../api/carAPI.types';

export function getCardState(state: number) {
    switch (state) {
        case 0:
            return <Box color="red">Under service</Box>;
        case 1:
            return (
                <Box color="green" fontSize="16px" fontWeight="500">
                    Repaired
                </Box>
            );

        case 2:
            return (
                <Box>
                    <Box color="yellow" fontSize="16px" fontWeight="500">
                        Waits to be collected
                    </Box>
                </Box>
            );
        default:
            return (
                <Box color="red" fontSize="16px" fontWeight="500">
                    INVALID STATE
                </Box>
            );
    }
}

export const validate = (values: Car) => {
    const errors: FormikErrors<Car> = {};

    if (values.licensePlate.length === 0) {
        errors.licensePlate = 'Please provide license plate';
    }
    if (values.model.length === 0) {
        errors.model = 'Please provide car model';
    }
    if (values.licensePlate.length < 4) {
        errors.licensePlate = 'Too short license plate';
    }

    return errors;
};
