import {Flex, Text} from '@chakra-ui/react';
import React from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {colors} from '../../../../../globalTheme/theme';

interface Props {
    title: string;
    path: string;
}

export const MenuNavItem: React.FC<Props> = ({title, path}) => {
    const match = useRouteMatch(path);
    const history = useHistory();

    const navigate = () => {
        if (match === null) {
            history.push(path);
        }
    };

    return (
        <Flex
            marginTop={4}
            height={'57px'}
            width={'100%'}
            backgroundColor={colors.purpleHeart}
            alignItems={'center'}
            borderRight={'11px solid'}
            borderColor={colors.mediumPurple}
            cursor={'pointer'}
            onClick={navigate}
        >
            <Text color={'white'} fontSize={'24px'} padding={2}>
                {title}
            </Text>
        </Flex>
    );
};
