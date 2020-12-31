import {Flex, Text} from '@chakra-ui/react';
import React from 'react';
import {colors} from '../../../../globalTheme/theme';
import {MENU_HEIGHT} from './Menu.constants';
import {ServiceIcon, SettingsIcon} from './Menu.icons';

export const MenuTitle = () => {
    return (
        <Flex
            as={'nav'}
            align={'center'}
            justify={'space-between'}
            p={5}
            shadow={'sm'}
            backgroundColor={colors.purple}
            width={'100%'}
            h={`${MENU_HEIGHT}px`}
            position={'fixed'}
            top={0}
            zIndex={1}
        >
            <Flex>
                <ServiceIcon boxSize={8} />
                <Text color={'white'} marginTop={1} marginLeft={3} fontSize={'lg'}>
                    myService
                </Text>
            </Flex>
            <SettingsIcon boxSize={6} />
        </Flex>
    );
};
