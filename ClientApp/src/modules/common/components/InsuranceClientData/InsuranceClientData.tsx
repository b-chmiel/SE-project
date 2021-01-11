import React from 'react';
import {Text, Container, Grid, GridItem} from '@chakra-ui/react';
import {PersonIcon} from './InsuranceClientData.icons';
import 'react-datepicker/dist/react-datepicker.css';

interface Props { 
    name: string;
    data: string[];
}

export const InsuranceClient: React.FC<Props> = ({name, data}) => {
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
                        {name}
                    </Text>
                    <Text fontSize={'20px'}>
                        {data[0]}
                    </Text> 
                    <Text  fontSize={'20px'}>
                        {data[1]}
                    </Text> 
                </GridItem>

            </Grid>
        </Container>
    );
};
