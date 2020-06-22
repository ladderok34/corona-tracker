import React from 'react';
import {
    List as NativeBaseList,
    ListItem,
    Text,
    Left,
    Body,
    Right,
    Button,
    Badge,
} from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    listItem: {
        marginVertical: 10,
    },
    badge: {
        width: 80,
    },
});

const List = ({ cases, navigateToCase }) => (
    <NativeBaseList>
        <ListItem thumbnail style={styles.listItem}>
            <Left>
                <Badge style={styles.badge} info>
                    <Text>{cases.TotalConfirmed}</Text>
                </Badge>
            </Left>
            <Body>
                <Text>Total</Text>
                <Text note numberOfLines={1}>Total confirmed cases</Text>
            </Body>
            <Right>
                <Button
                    transparent
                    onPress={() => { navigateToCase('total'); }}
                >
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
        <ListItem thumbnail style={styles.listItem}>
            <Left>
                <Badge style={styles.badge} error>
                    <Text>{cases.TotalDeaths}</Text>
                </Badge>
            </Left>
            <Body>
                <Text>Deaths</Text>
                <Text note numberOfLines={1}>Total confirmed deaths</Text>
            </Body>
            <Right>
                <Button
                    transparent
                    onPress={() => { navigateToCase('deaths'); }}
                >
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
        <ListItem thumbnail style={styles.listItem}>
            <Left>
                <Badge style={styles.badge} success>
                    <Text>{cases.TotalRecovered}</Text>
                </Badge>
            </Left>
            <Body>
                <Text>Recovered</Text>
                <Text note numberOfLines={1}>Total recovered</Text>
            </Body>
            <Right>
                <Button
                    transparent
                    onPress={() => { navigateToCase('recovered'); }}
                >
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
        <ListItem thumbnail style={styles.listItem}>
            <Left>
                <Badge style={styles.badge} warning>
                    <Text>{cases.NewConfirmed}</Text>
                </Badge>
            </Left>
            <Body>
                <Text>New Cases</Text>
                <Text note numberOfLines={1}>New confirmed cases</Text>
            </Body>
            <Right>
                <Button
                    transparent
                    onPress={() => { navigateToCase('new-confirmed'); }}
                >
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
        <ListItem thumbnail style={styles.listItem}>
            <Left>
                <Badge style={styles.badge} danger>
                    <Text>{cases.NewConfirmed}</Text>
                </Badge>
            </Left>
            <Body>
                <Text>New Deaths</Text>
                <Text note numberOfLines={1}>New confirmed deaths</Text>
            </Body>
            <Right>
                <Button
                    transparent
                    onPress={() => { navigateToCase('new-deaths'); }}
                >
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
        <ListItem thumbnail style={styles.listItem}>
            <Left>
                <Badge style={styles.badge} success>
                    <Text>{cases.NewRecovered}</Text>
                </Badge>
            </Left>
            <Body>
                <Text>New Recovered</Text>
                <Text note numberOfLines={1}>New NewRecovered</Text>
            </Body>
            <Right>
                <Button
                    transparent
                    onPress={() => { navigateToCase('new-recovered'); }}
                >
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
    </NativeBaseList>
);

List.propTypes = {
    cases: PropTypes.object.isRequired,
    navigateToCase: PropTypes.func.isRequired,
};

List.displayName = 'List';
export default React.memo(List);
