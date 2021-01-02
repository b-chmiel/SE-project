import {Flex} from '@chakra-ui/react';
import React from 'react';
import {colors} from '../../../../../globalTheme/theme';
import {MENU_HEIGHT, MENU_WIDTH} from '../Menu.constants';
import {getMenuEntries} from './MenuNav.helpers';
import {CURRENT_USER} from './MenuNav.mocks';
import {MenuNavItem} from './MenuNavItem';

export const MenuNav = () => {
    const menuLinks = getMenuEntries(CURRENT_USER) as any[];

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
            {menuLinks.map(({path, title}, i) => (
                <MenuNavItem key={i} path={path} title={title} />
            ))}
        </Flex>
    );
};
