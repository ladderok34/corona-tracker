import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    Text,
    Left,
    Right,
    Body,
    Content,
    Badge,
    View,
    Button,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { prettifyNumber } from 'utils';

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'space-between',
    },
    listItem: {
        marginVertical: 10,
    },
    badge: {
        width: 110,
    },
});

/*const cleanupDate = date => `${date.getFullYear()}:${(date.getMonth())}:${date.getDate()}`;

const getData = (data, name) => {
    let date;

    if (name === 'today') {
        date = new Date();
    }

    if (name === 'yesterday') {
        date = new Date(new Date().setDate(new Date().getDate() - 1));
    }

    if (name === '2-days-ago') {
        date = new Date(new Date().setDate(new Date().getDate() - 2));
    }

    return data.find(item => {
        const itemDate = new Date(item.Date);

        if (cleanupDate(date) === cleanupDate(itemDate)) {
            return item;
        }
    });
};*/

const Tab = ({ data, tabName }) => {
    if (!Object.keys(data).length) {
        return null;
    }

    return (
        <List>
            <ListItem thumbnail style={styles.listItem}>
                <Left>
                    <Badge style={styles.badge} warning>
                        <Text>{prettifyNumber(data.confirmed)}</Text>
                    </Badge>
                </Left>
                <Body>
                    <Text>Total Confirmend</Text>
                </Body>
                <Right />
            </ListItem>
            <ListItem thumbnail style={styles.listItem}>
                <Left>
                    <Badge style={styles.badge} error>
                        <Text>{prettifyNumber(data.deaths)}</Text>
                    </Badge>
                </Left>
                <Body>
                    <Text>Total Deaths</Text>
                </Body>
                <Right />
            </ListItem>
            <ListItem thumbnail style={styles.listItem}>
                <Left>
                    <Badge style={styles.badge} success>
                        <Text>{prettifyNumber(data.recovered)}</Text>
                    </Badge>
                </Left>
                <Body>
                    <Text>Total Recovered</Text>
                </Body>
                <Right />
            </ListItem>
            <ListItem thumbnail style={styles.listItem}>
                <Left>
                    <Badge style={styles.badge} info>
                        <Text>{prettifyNumber(data.confirmed - (data.recovered + data.deaths))}</Text>
                    </Badge>
                </Left>
                <Body>
                    <Text>Total Active</Text>
                </Body>
                <Right />
            </ListItem>
        </List>
    );
};

Tab.propTypes = {
    data: PropTypes.object.isRequired,
    tabName: PropTypes.oneOf([
        'total',
        'yesterday',
        '2-days-ago',
    ]),
};

Tab.defaultProps = {
    tabName: 'today',
};

Tab.displayName = 'Tab';
export default React.memo(Tab);
