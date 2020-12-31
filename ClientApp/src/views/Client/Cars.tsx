import {Box} from '@chakra-ui/react';
import React from 'react';
import AddCarButton from '../../modules/common/components/CarCard/AddCar';
import CarCard from '../../modules/common/components/CarCard/CarCard';

type CarsProps = {
    props: string;
};

const Cars: React.FC<CarsProps> = ({props}) => {
    return (
        <Box>
            <AddCarButton></AddCarButton>
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
            ></CarCard>
        </Box>
    );
};
export default Cars;
