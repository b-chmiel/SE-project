import { Box, Button, Center, Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ClientRoutes } from '../../../../routing/routes';
import { DiagnosticProfileButton } from '../../../common/components/DiagnosticProfile/DiagnosticProfile';
import { CarIcon } from './CarCard.icons';

interface Props {
    model: string;
    type: string;
    licensePlate: string;
    showAppointmentButton?: boolean;
}

export const CarCard: React.FC<Props> = ({model, type, licensePlate, showAppointmentButton = false}) => {
    const history = useHistory();

    function makeAppointment(licensePlate: string) {
        history.push(ClientRoutes.MAKE_APPOINTMENT.replace(':licensePlate', licensePlate));
    }
    return (
        <Container variant={'car-card'}>
            <Grid h="200px" templateRows="repeat(5, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
                <GridItem colSpan={1} rowSpan={5}>
                    <Center paddingTop="20px">
                        <CarIcon boxSize={16} />
                    </Center>
                    <Center paddingTop="20px">
                        <Box color="purple" fontWeight="500">
                            {model}
                        </Box>
                    </Center>
                    <Center paddingTop="5px">
                        <Box color="purple" fontWeight="300" fontSize="14px">
                            {type}
                        </Box>
                    </Center>
                </GridItem>

                <GridItem colSpan={2} rowSpan={1}>
                    LICENSE PLATE
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                    {licensePlate}
                </GridItem>

                <GridItem colSpan={3} rowSpan={1}>
                    <DiagnosticProfileButton licensePlate={licensePlate}></DiagnosticProfileButton>
                </GridItem>
                <GridItem colSpan={3} rowSpan={1}>
                    {showAppointmentButton ? (
                        <Button onClick={() => makeAppointment(licensePlate)} float="right">
                            APPOINTMENT
                        </Button>
                    ) : (
                        <></>
                    )}
                </GridItem>
            </Grid>
        </Container>
    );
};
