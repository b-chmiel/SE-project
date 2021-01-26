import {Box} from '@chakra-ui/react';
import React from 'react';
import {useInit} from '../../../common/hooks/useInit';
import {CarCard} from '../../components/CarCard/CarCard';
import {CarCardModal} from '../../components/CarCard/CarCardModal';
import {useCar} from '../../hooks/useCar';

const CarsView: React.FC = () => {
    const {fetchCars, cars} = useCar();

    useInit(fetchCars);

    return (
        <Box>
            <CarCardModal />

            {cars?.map((c) => (
                <CarCard licensePlate={c.licensePlate} model={c.model} type={c.type} showAppointmentButton></CarCard>
            ))}
        </Box>
    );
};
export default CarsView;
