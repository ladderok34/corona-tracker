import React from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        marginVertical: 50,
        textAlign: 'center',
    },
});

const Empty = () => (
    <Text style={styles.text}>
        Favorites list is empty!
    </Text>
);

Empty.displayName = 'Empty';
export default React.memo(Empty);
