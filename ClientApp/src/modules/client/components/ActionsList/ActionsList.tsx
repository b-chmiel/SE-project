import {Box, ListItem, Text, UnorderedList} from '@chakra-ui/react';
import React from 'react';

interface Props {
    title: string;
    actions: string[];
}

export const ActionsList: React.FC<Props> = ({title, actions}) => {
    return (
        <Box mt={4}>
            <Text as="b" fontSize={'lg'}>
                {title}
            </Text>
            <UnorderedList spacing={3}>
                {actions.map((action, i) => (
                    <ListItem key={i}>
                        <Text>{action}</Text>
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    );
};
