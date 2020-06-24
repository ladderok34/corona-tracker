import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Text } from 'native-base';

const Case = () => {
    const route = useRoute();
    const { name } = route.params;

    return (
        <Text>Current case: {name}</Text>
    );
};

Case.displayName = 'Case';
export default Case;
