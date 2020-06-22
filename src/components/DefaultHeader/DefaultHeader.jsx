import React, { useCallback } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
} from 'native-base';
import PropTypes from 'prop-types';

const DefaultHeader = ({ title }) => {
    const navigation = useNavigation();
    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    return (
        <Header>
            <Left>
                <Button
                    transparent
                    onPress={openDrawer}
                >
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right />
        </Header>
    );
};

DefaultHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

DefaultHeader.displayName = 'DefaultHeader';
export default React.memo(DefaultHeader);
