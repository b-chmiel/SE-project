import {Flex, Text} from '@chakra-ui/react';
import React from 'react';

interface Props {
    title: string;
    value: string;
}

export const TextInfoBadge: React.FC<Props> = ({title, value}) => (
    <Flex flexDirection={'column'} margin={4}>
        <Text as="b" fontSize={'lg'}>
            {title}
        </Text>
        <Text fontSize={'lg'}>{value.replaceAll('_', ' ')}</Text>
    </Flex>
);
