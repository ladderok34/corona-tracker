import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
    },
});

const LoadingFailed = ({ refetch }) => (
    <ErrorBoundary>
        <Text style={styles.text}>
            Something went wrong
        </Text>
        <Button onPress={refetch}>
            <Text>Try again</Text>
        </Button>
    </ErrorBoundary>
);

LoadingFailed.propTypes = {
    refetch: PropTypes.func.isRequired,
};

LoadingFailed.displayName = 'LoadingFailed';
export default React.memo(LoadingFailed);
