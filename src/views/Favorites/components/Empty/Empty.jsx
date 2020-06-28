import React from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const styles = StyleSheet.create({
    text: {
        marginVertical: 50,
        textAlign: 'center',
    },
});

const Empty = () => (
    <ErrorBoundary>
        <Text style={styles.text}>
            Favorites list is empty!
        </Text>
    </ErrorBoundary>
);

Empty.displayName = 'Empty';
export default React.memo(Empty);
