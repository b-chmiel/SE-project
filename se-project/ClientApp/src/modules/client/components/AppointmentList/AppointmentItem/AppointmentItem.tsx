import {Box, Button, Center, Flex, Text} from '@chakra-ui/react';
import {format} from 'date-fns';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {colors} from '../../../../../globalTheme/theme';
import {ClientRoutes} from '../../../../../routing/routes';
import {CarIcon} from '../../../../common/components/CarCard/CarCard.icons';
import {Dot} from '../../../../common/components/Dot/Dot';
import {Appointment} from '../AppointmentList.types';
import {dateFormat} from './AppointmentItem.constants';
import {getStatusColor} from './AppointmentItem.helpers';

interface Props {
    appointment: Appointment;
}

export const AppointmentItem: React.FC<Props> = ({appointment}) => {
    const {carName, appointmentDate, appointmentStatus} = appointment;
    const date = format(appointmentDate, dateFormat);
    const history = useHistory();

    const handleDetailsClick = () => {
        history.push(ClientRoutes.APPOINTMENT_DETAILS);
    };

    return (
        <Flex p={2} width={'940px'} justifyContent={'space-between'}>
            <Flex>
                <Center>
                    <Dot size={3} color={colors.windsor} />
                    <Box marginRight={6} marginLeft={6}>
                        <CarIcon boxSize={8} />
                    </Box>
                    <Text fontSize={'lg'} color={colors.windsor} marginRight={6}>
                        {carName}
                    </Text>
                    <Text fontSize={'lg'} color={colors.mediumPurple}>
                        {date}
                    </Text>
                </Center>
            </Flex>
            <Flex>
                <Center>
                    <Text fontSize={'lg'} color={getStatusColor(appointmentStatus)} textTransform={'uppercase'} marginRight={6}>
                        {appointmentStatus}
                    </Text>
                    <Button onClick={handleDetailsClick}>DETAILS</Button>
                </Center>
            </Flex>
        </Flex>
    );
};
