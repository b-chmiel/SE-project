import {Box, Button, Center, Container, Grid, GridItem} from '@chakra-ui/react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {DiagnosticProfileType} from '../DiagnosticProfile/DiagnosticProfileType';
import {getCardState} from './CarCard.helpers';
import {CarIcon} from './CarCard.icons';

interface Props {
    state: number;
    model: string;
    type: string;
    diagnostics: DiagnosticProfileType;
    showAppointmentButton?: boolean;
}

export const CarCard: React.FC<Props> = ({state, model, type, diagnostics, showAppointmentButton = false}) => {
    const history = useHistory();

    function makeAppointment(carid: number) {
        history.push('/appointment?car_id=' + carid); //CHANGE to appropiate car id
    }

    return (
        <Container variant={'car-card'}>
            <Grid h="200px" templateRows="repeat(5, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
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
                <GridItem colSpan={4} rowSpan={4}>
                    {getCardState(state)}
                    <Box color="darkgray" paddingTop="5px">
                        breaks: {diagnostics.breaks}
                    </Box>
                    <Box color="darkgray">engine: {diagnostics.engine}</Box>
                    <Box color="darkgray">body: {diagnostics.body}</Box>
                    <Box color="darkgray">lighting: {diagnostics.lighting}</Box>
                    <Box color="darkgray">battery: {diagnostics.battery}</Box>
                    <Box color="darkgray">sensors: {diagnostics.sensors}</Box>
                </GridItem>
                <GridItem colSpan={4} rowSpan={1}>
                    {showAppointmentButton ? (
                        <Button onClick={() => makeAppointment(1)} float="right">
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
