import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
    },
});

const LoadingFailed = ({ refetch }) => (
    <>
        <Text style={styles.text}>
            Something went wrong
        </Text>
        <Button onPress={refetch}>
            <Text>Try again</Text>
        </Button>
    </>
);

LoadingFailed.propTypes = {
    refetch: PropTypes.func.isRequired,
};

LoadingFailed.displayName = 'LoadingFailed';
export default React.memo(LoadingFailed);
