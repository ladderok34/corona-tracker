import React, { useCallback } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
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

const DefaultHeader = ({ title, ...props }) => {
    const navigation = useNavigation();
    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    return (
        <ErrorBoundary>
            <Header {...props}>
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
        </ErrorBoundary>
    );
};

DefaultHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

DefaultHeader.displayName = 'DefaultHeader';
export default React.memo(DefaultHeader);
