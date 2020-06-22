import React from 'react';
import PropTypes from 'prop-types';
import { Container as NativeBaseContainer, Content } from 'native-base';
import { ActivityIndicator } from 'react-native';
import LoadingFailed from './components/LoadingFailed/LoadingFailed';

const contentContainerStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' };

const Container = ({
    children,
    header,
    showSpinner,
    failedLoading,
    refetch,
}) => (
    <NativeBaseContainer>
        {header && header}
        <Content
            contentContainerStyle={(failedLoading || showSpinner) ? contentContainerStyle : {}}
        >
            {failedLoading && <LoadingFailed refetch={refetch} />}
            {showSpinner && <ActivityIndicator size="large" />}
            {children && children}
        </Content>
    </NativeBaseContainer>
);

Container.propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    showSpinner: PropTypes.bool,
    failedLoading: PropTypes.bool,
    refetch: PropTypes.func,
};

Container.defaultProps = {
    children: null,
    header: null,
    showSpinner: false,
    failedLoading: false,
    refetch: () => {},
};

Container.displayName = 'Container';
export default React.memo(Container);
