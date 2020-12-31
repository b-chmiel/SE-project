import { Center, Container, Grid, GridItem, Box, Button } from "@chakra-ui/react";

import React from "react";
import car from "./resources/car.svg";
import { useHistory } from "react-router-dom";
import type {DiagnosticProfileType} from '../DiagnosticProfile/DiagnosticProfileType'

type CardProps = {
    state: number,
    model: string,
    type: string,
    diagnostics: DiagnosticProfileType
}

function getCardState(state: number){
    switch(state){
        case 0:
            return <Box color="red">
                Under service
            </Box>
        case 1:
            return <Box color="green" fontSize="16px" fontWeight="500">
                Repaired
            </Box>
        
        case 2:
            return <Box>
                <Box color="yellow" fontSize="16px" fontWeight="500">
                Waits to be collected
                </Box>
            </Box>
        default:
            return <Box color="red" fontSize="16px" fontWeight="500">
                INVALID STATE
            </Box>
    }
}

const CarCard: React.FC<CardProps> = ({ state, model, type, diagnostics}) => {
    let history = useHistory();
    function makeAppointment(carid: number) {
        history.push("/appointment?car_id=" + carid); //CHANGE to appropiate car id 
    }
    return <Container variant={"car-card"} >
        <Grid
            h="200px"
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}>
            <GridItem colSpan={1} rowSpan={5} >
                <Center paddingTop="20px">
                    <img width="60px" src={car} alt=""></img>  
                </Center>
                <Center paddingTop="20px">
                    <Box color="purple" fontWeight="500">{model}</Box>
                </Center>
                <Center paddingTop="5px">
                    <Box 
                        color="purple"
                        fontWeight="300" 
                        fontSize="14px"
                        >
                            {type}
                    </Box>
                </Center>
            </GridItem>
            <GridItem colSpan={4} rowSpan={4}>
                {getCardState(state)}
                <Box color="darkgray"
                    paddingTop="5px">
                    breaks: {diagnostics.breaks}
                </Box>
                <Box color="darkgray">
                    engine: {diagnostics.engine}
                </Box>
                <Box color="darkgray">
                    body: {diagnostics.body}
                </Box>
                <Box color="darkgray">
                lighting: {diagnostics.lighting}
                </Box>
                <Box color="darkgray">
                battery: {diagnostics.battery}
                </Box>
                <Box color="darkgray">
                    sensors: {diagnostics.sensors}
                </Box>
                
                
            </GridItem>
            <GridItem colSpan={4} rowSpan={1}>
            <Button onClick={()=>makeAppointment(1)} float="right"> 
                    APPOINTMENT
                </Button>
            </GridItem>
        </Grid>
    </Container>
}

export default CarCard