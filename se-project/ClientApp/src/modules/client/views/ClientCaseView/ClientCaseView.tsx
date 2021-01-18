import {Box, Button, Grid, GridItem} from '@chakra-ui/react';
import React from 'react';
import {CarCard} from '../../../common/components/CarCard/CarCard';
import {DescriptionCard} from '../../../common/components/DescriptionCard/DescriptionCard';
import {TextInfoBadge} from '../../../common/components/TextInfoBadge/TextInfoBadge';
import {ActionsList} from '../../components/ActionsList/ActionsList';
import {MockedClientCarInfo} from './ClientCaseView.mocks';

export const ClientCaseView: React.FC = () => {
    const carInfo = MockedClientCarInfo;

    return (
        <>
            <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)" h="420px" gap={4} marginRight={8}>
                <GridItem rowSpan={1} colSpan={2}>
                    <CarCard licensePlate={carInfo.licensePlate} model={carInfo.model} type={carInfo.type} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} marginTop={4}>
                    <Button width="242px" margin={2}>
                        CALL TO WORKSHOP
                    </Button>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} rowStart={2}>
                    <TextInfoBadge title={'TYPE'} value={carInfo.appointmentType} />
                    <TextInfoBadge title={'PRIORITY'} value={carInfo.priority} />
                </GridItem>
            </Grid>
            <Box margin={4} marginRight={16}>
                <DescriptionCard description={carInfo.description} />
                <ActionsList actions={carInfo.actions} title={'ACTIONS'} />
                <ActionsList actions={carInfo.commentsFromWorkshop} title={'COMMENTS FROM WORKSHOP'} />
            </Box>
        </>
    );
};
