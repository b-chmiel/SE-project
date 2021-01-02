import {Box, Button, Grid, GridItem} from '@chakra-ui/react';
import React from 'react';
import {CarCard} from '../../../common/components/CarCard/CarCard';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {DescriptionCard} from '../../../common/components/DescriptionCard/DescriptionCard';
import {TextInfoBadge} from '../../../common/components/TextInfoBadge/TextInfoBadge';
import {MockedCarInfo} from '../../CaseView.mocks';

export const CaseView: React.FC = () => {
    const carInfo = MockedCarInfo;

    return (
        <>
            <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)" h="420px" gap={4} marginRight={8}>
                <GridItem rowSpan={1} colSpan={2}>
                    <CarCard diagnostics={carInfo.diagnostics} state={carInfo.state} model={carInfo.model} type={carInfo.type} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} marginTop={4}>
                    <DatePicker name={'date'} value={new Date()} onChange={() => {}} showPopperArrow disabled={true} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} marginTop={2}>
                    <Button width="242px" margin={2}>
                        CHANGE STATUS
                    </Button>
                    <Button width="242px" margin={2}>
                        REPORT ISSUES
                    </Button>
                    <Button width="242px" margin={2}>
                        ORDER PARTS
                    </Button>
                    <Button width="242px" margin={2}>
                        DIAGNOSTIC
                    </Button>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} rowStart={2}>
                    <TextInfoBadge title={'TYPE'} value={carInfo.appointmentType} />
                    <TextInfoBadge title={'PRIORITY'} value={carInfo.priority} />
                </GridItem>
            </Grid>
            <Box margin={4} marginRight={16}>
                <DescriptionCard description={carInfo.description} />
            </Box>
        </>
    );
};
