import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
    },
});

const LoadingFailedView = ({ fetchSummary }) => (
    <>
        <Text style={styles.text}>
            Something went wrong
        </Text>
        <Button onPress={fetchSummary}>
            <Text>Try again</Text>
        </Button>
    </>
);

LoadingFailedView.propTypes = {
    fetchSummary: PropTypes.func.isRequired,
};

LoadingFailedView.displayName = 'LoadingFailedView';
export default React.memo(LoadingFailedView);
