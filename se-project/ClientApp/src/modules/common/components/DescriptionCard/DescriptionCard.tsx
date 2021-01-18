import {Flex, Text} from '@chakra-ui/react';
import React from 'react';

interface Props {
    description: string;
}

export const DescriptionCard: React.FC<Props> = ({description}) => (
    <Flex flexDirection={'column'}>
        <Text as="b" fontSize={'lg'}>
            DESCRIPTION
        </Text>
        <Text>{description}</Text>
    </Flex>
);
