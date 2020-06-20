import React from 'react';
import {
    Header as NativeBaseHeader,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
} from 'native-base';
import PropTypes from 'prop-types';

const Header = ({ openDrawer }) => (
    <NativeBaseHeader>
        <Left>
            <Button
                transparent
                onPress={openDrawer}
            >
                <Icon name='menu' />
            </Button>
        </Left>
        <Body>
            <Title>All Cases</Title>
        </Body>
        <Right />
    </NativeBaseHeader>
);

Header.propTypes = {
    openDrawer: PropTypes.func.isRequired,
};

Header.displayName = 'Header';
export default React.memo(Header);
