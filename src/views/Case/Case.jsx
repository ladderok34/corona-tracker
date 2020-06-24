import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Text } from 'native-base';
import Container from 'components/Container/Container';

const Case = () => {
    const route = useRoute();
    const { name } = route.params;

    return (
        <Container>
            <Text>Current case: {name}</Text>
        </Container>
    );
};

Case.displayName = 'Case';
export default Case;
