import {Box} from '@chakra-ui/react';
import React from 'react';
import {CarCard} from '../../modules/common/components/CarCard/CarCard';
import {CarCardModal} from '../../modules/common/components/CarCard/CarCardModal';

type CarsProps = {
    props: string;
};

const Cars: React.FC<CarsProps> = ({props}) => {
    return (
        <Box>
            <CarCardModal></CarCardModal>
            <CarCard
                diagnostics={{
                    engine: 'broke ',
                    body: 'broke ',
                    breaks: 'broke',
                    battery: 'doesnt work',
                    lighting: 'doesnt work',
                    sensors: 'doesnt work',
                }}
                state={2}
                model="OPEL ASTRA"
                type="SEDAN"
                showAppointmentButton
            ></CarCard>
            <CarCard
                diagnostics={{
                    engine: 'broke ',
                    body: 'broke ',
                    breaks: 'broke',
                    battery: 'doesnt work',
                    lighting: 'doesnt work',
                    sensors: 'doesnt work',
                }}
                state={1}
                model="VOLKSVAGEN PASSAT"
                type="SEDAN"
                showAppointmentButton={true}
            ></CarCard>
        </Box>
    );
};
export default Cars;
