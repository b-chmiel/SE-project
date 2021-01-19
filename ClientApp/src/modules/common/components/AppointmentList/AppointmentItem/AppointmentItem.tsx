import {Box, Button, Center, Flex, Text} from '@chakra-ui/react';
import {format, parseISO} from 'date-fns';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {colors} from '../../../../../globalTheme/theme';
import {Visit} from '../../../../employee/api/visitAPI.types';
import {CarIcon} from '../../CarCard/CarCard.icons';
import {Dot} from '../../Dot/Dot';
import {dateFormat} from './AppointmentItem.constants';
import {getStatusColor} from './AppointmentItem.helpers';

interface Props {
    visit: Visit;
    detailsPath: string;
}

export const VisitItem: React.FC<Props> = ({visit, detailsPath}) => {
    const {date: visitDate, licensePlate, status, visitId} = visit;
    const date = format(parseISO(visitDate), dateFormat);
    const history = useHistory();

    const handleDetailsClick = () => {
        history.push(detailsPath.replace(':caseId', visitId.toString()));
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
                        {licensePlate}
                    </Text>
                    <Text fontSize={'lg'} color={colors.mediumPurple}>
                        {date}
                    </Text>
                </Center>
            </Flex>
            <Flex>
                <Center>
                    <Text fontSize={'lg'} color={getStatusColor(status)} textTransform={'uppercase'} marginRight={6}>
                        {status}
                    </Text>
                    <Button onClick={handleDetailsClick}>DETAILS</Button>
                </Center>
            </Flex>
        </Flex>
    );
};
