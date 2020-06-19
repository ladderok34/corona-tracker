import React from 'react';
import { Container, Content, Text } from 'native-base';

const Country = () => {
    return (
        <Container>
            <Content>
                <Text>Country</Text>
            </Content>
        </Container>
    );
};

Country.displayName = "Country";
export default React.memo(Country);
