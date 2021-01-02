import {Box} from '@chakra-ui/react';
import React from 'react';

export function getCardState(state: number) {
    switch (state) {
        case 0:
            return <Box color="red">Under service</Box>;
        case 1:
            return (
                <Box color="green" fontSize="16px" fontWeight="500">
                    Repaired
                </Box>
            );

        case 2:
            return (
                <Box>
                    <Box color="yellow" fontSize="16px" fontWeight="500">
                        Waits to be collected
                    </Box>
                </Box>
            );
        default:
            return (
                <Box color="red" fontSize="16px" fontWeight="500">
                    INVALID STATE
                </Box>
            );
    }
}
