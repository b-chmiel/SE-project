import { Center, Container, Grid, GridItem, Box } from "@chakra-ui/react";
import React from "react";
import car from "./resources/car.svg";

type CardProps = {
    state: number,
    model: string,
    type: string,
    desc: string
}

function getCardState(state: number){
    switch(state){
        case 0:
            return <Box color="#EB0000">
                Under service
            </Box>
        case 1:
            return <Box color="#0ECC21">
                Repaired
            </Box>
        
        case 2:
            return <Box>
                <Box color="#E3992B">
                Waits to be collected
                </Box>
            </Box>
        default:
            return <Box color="#EB0000">
                INVALID STATE
            </Box>
    }
}

const CarCard: React.FC<CardProps> = ({state, model, type, desc}) => {
    return <Container variant="car-card" >
        <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}>
            <GridItem colSpan={1} rowSpan={2} >
                <Center paddingTop="20px">
                    <img width="60px" src={car} alt=""></img>  
                </Center>
                <Center paddingTop="20px">
                    <Box color="#8000FF" fontWeight="500">{model}</Box>
                </Center>
                <Center paddingTop="5px">
                    <Box 
                        color="#8000FF"
                        fontWeight="300" 
                        fontSize="14px"
                        >
                            {type}
                    </Box>
                </Center>
            </GridItem>
            <GridItem colSpan={4} rowSpan={2}>
                {getCardState(state)}
                <Box color="#454545"
                    paddingTop="10px">
                    {desc}
                </Box>
            </GridItem>
        </Grid>
    </Container>
}

export default CarCard