import React from 'react';
import { View, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    view: {
        width: '90%',
        marginVertical: 100,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
    },
    textBold: {
        fontWeight: 'bold',
    },
    button: {
        textAlign: 'center',
        width: '60%',
        marginLeft: '20%',
    },
});

const NoResults = ({ searchQuery, resetSearch }) => (
    <View style={styles.view}>
        <Text style={styles.text}>
            No results found for <Text style={styles.textBold}>{`"${searchQuery}"`}</Text>
        </Text>
        <Button block onPress={resetSearch} style={styles.button}>
            <Text>Reset search</Text>
        </Button>
    </View>
);

NoResults.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    resetSearch: PropTypes.func.isRequired,
};

NoResults.displayName = 'NoResults';
export default React.memo(NoResults);
