import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Container, Content, Text } from 'native-base';

const Case = () => {
    const route = useRoute();
    const { name } = route.params;

    return (
        <Container>
            <Content>
                <Text>Current case: {name}</Text>
            </Content>
        </Container>
    );
};

Case.displayName = 'Case';
export default React.memo(Case);
