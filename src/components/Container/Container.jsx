import React from 'react';
import PropTypes from 'prop-types';
import { Container as NativeBaseContainer, Content } from 'native-base';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import LoadingFailed from 'components/LoadingFailed/LoadingFailed';

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Container = ({
    children,
    header,
    tabs,
    isLoaded,
    isError,
    refetch,
    centered,
}) => (
    <NativeBaseContainer>
        {header && header}
        {tabs && tabs}
        <View
            style={centered ? styles.centered : {}}
        >
            {isError && <LoadingFailed refetch={refetch} />}
            {!isLoaded && <ActivityIndicator size="large" />}
            {children && children}
        </View>
    </NativeBaseContainer>
);

Container.propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    tabs: PropTypes.node,
    isLoaded: PropTypes.bool,
    isError: PropTypes.bool,
    refetch: PropTypes.func,
};

Container.defaultProps = {
    children: null,
    header: null,
    tabs: null,
    isLoaded: true,
    isError: false,
    refetch: () => {},
};

Container.displayName = 'Container';
export default React.memo(Container);