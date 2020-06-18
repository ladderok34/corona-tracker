import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
    },
});

const FailedLoading = ({ fetchSummary }) => (
    <>
        <Text style={styles.text}>
            Something went wrong
        </Text>
        <Button onPress={fetchSummary}>
            <Text>Try again</Text>
        </Button>
    </>
);

FailedLoading.propTypes = {
    fetchSummary: PropTypes.func.isRequired,
};

FailedLoading.displayName = 'FailedLoading';
export default React.memo(FailedLoading);
