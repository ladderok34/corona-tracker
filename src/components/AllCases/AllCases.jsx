import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
} from 'native-base';

const AllCases = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>All Cases</Title>
                </Body>
                <Right />
            </Header>
        </Container>
    );
};

export default AllCases;
