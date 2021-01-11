import React from 'react';
import {Text, Container, Grid, GridItem} from '@chakra-ui/react';
import {PersonIcon} from './InsuranceClientData.icons';
import { PersonInfo } from './InsuranceClientData.types';

interface Props { 
    personInfo: PersonInfo;
}

export const InsuranceClient: React.FC<Props> = ({personInfo}) => {
    return ( 
        <Container>
            <Grid h="150px" templateRows="repeat(2, 1fr)"  templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem rowSpan={2} colSpan={1} paddingRight={4}> 
                    <PersonIcon boxSize={90} />
                </GridItem>
                <GridItem rowSpan={10} colSpan={1}> 
                    <Text fontSize={'24px'}>
                        OWNER
                    </Text>
                    <Text color={'windsor'} fontSize={'20px'} >
                        {personInfo.name+" "+personInfo.surname}
                    </Text>
                    <Text fontSize={'20px'}>
                        {personInfo.pesel}
                    </Text> 
                    <Text  fontSize={'20px'}>
                        {personInfo.serviceId}
                    </Text> 
                </GridItem>
            </Grid>
        </Container>
    );
};
