import {Flex} from '@chakra-ui/react';
import React from 'react';
import {colors} from '../../../../../globalTheme/theme';
import {MENU_HEIGHT, MENU_WIDTH} from '../Menu.constants';
import {Links} from './MenuNav.constants';
import {MenuNavItem} from './MenuNavItem';

export const MenuNav = () => {
    return (
        <Flex
            as={'nav'}
            position={'fixed'}
            left={0}
            zIndex={1}
            height={'100%'}
            width={`${MENU_WIDTH}px`}
            backgroundColor={colors.windsor}
            flexDir={'column'}
            paddingTop={`${MENU_HEIGHT}px`}
        >
            {Links.map(({path, title}) => (
                <MenuNavItem path={path} title={title} />
            ))}
        </Flex>
    );
};
