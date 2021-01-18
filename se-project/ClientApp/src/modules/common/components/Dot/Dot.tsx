import {Box} from '@chakra-ui/react';
import React from 'react';

interface Props {
    size: number;
    color: string;
}

export const Dot: React.FC<Props> = ({size, color}) => (
    <Box as="span" height={size} width={size} backgroundColor={color} borderRadius={'50%'} />
);
