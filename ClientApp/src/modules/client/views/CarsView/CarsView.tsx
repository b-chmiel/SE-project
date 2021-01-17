import {Box} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { CarCard } from '../../../common/components/CarCard/CarCard';
import { CarCardModal } from '../../../common/components/CarCard/CarCardModal';

type CarsProps = {
    props: string;
};
type Car = {
    licensePlate: string,
    model: string,
    type: string
}

const CarsView: React.FC<CarsProps> = ({props}) => {

    const [cars, setCars] = React.useState<Car[]>([]);

    useEffect(()=>{
        axios.get('/api/0.1.1/cars', {
            headers: {
                'Guid': localStorage.getItem('client_uuid')
            }
        }).then((res)=>{
            setCars(res.data)
        })
    },[])

    return (
        <Box>
            <CarCardModal></CarCardModal>

            {cars?.map(c=>
                <CarCard
                    licensePlate={c.licensePlate}
                    model={c.model}
                    type={c.type}
                    showAppointmentButton
                ></CarCard>
            )}
        </Box>
    );
};
export default CarsView;
