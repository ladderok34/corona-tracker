import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    Text,
    Title,
    Left,
    Right,
    Body,
    Icon,
    Content,
    Badge,
    View,
    Button,
} from 'native-base';
import { StyleSheet } from 'react-native';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'space-between',
    },
    viewTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryIcon: {
        fontSize: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inFavorites: {
        color: '#f0ad4e',
    },
    notInFavorites: {
        color: '#ccc',
    },
    listItem: {
        marginVertical: 10,
    },
    badge: {
        width: 80,
    },
});

const CountryPresentational = ({
    data,
    code,
    inFavorites,
    favoritesOnPress,
}) => {
    const recentData = data[data.length - 1];

    return (
        <>
            <View style={styles.view}>
                <View style={styles.viewTitle}>
                    <Text style={styles.countryIcon}>
                        {getUnicodeFlagIcon(code)}
                    </Text>
                    <Text style={styles.title}>
                        {recentData.Country}
                    </Text>
                </View>
                <View>
                    <Button
                        transparent
                        onPress={favoritesOnPress}
                    >
                        <Icon
                            name="star"
                            style={inFavorites ? styles.inFavorites : styles.notInFavorites}
                        />
                    </Button>
                </View>
            </View>
            <List>
                <ListItem thumbnail style={styles.listItem}>
                    <Left>
                        <Badge style={styles.badge} warning>
                            <Text>{recentData.Confirmed}</Text>
                        </Badge>
                    </Left>
                    <Body>
                        <Text>Total</Text>
                        <Text note numberOfLines={1}>Total confirmed cases</Text>
                    </Body>
                    <Right />
                </ListItem>
                <ListItem thumbnail style={styles.listItem}>
                    <Left>
                        <Badge style={styles.badge} error>
                            <Text>{recentData.Deaths}</Text>
                        </Badge>
                    </Left>
                    <Body>
                        <Text>Deaths</Text>
                        <Text note numberOfLines={1}>Total deaths</Text>
                    </Body>
                    <Right />
                </ListItem>
                <ListItem thumbnail style={styles.listItem}>
                    <Left>
                        <Badge style={styles.badge} success>
                            <Text>{recentData.Recovered}</Text>
                        </Badge>
                    </Left>
                    <Body>
                        <Text>Recovered</Text>
                        <Text note numberOfLines={1}>Total recovered</Text>
                    </Body>
                    <Right />
                </ListItem>
                <ListItem thumbnail style={styles.listItem}>
                    <Left>
                        <Badge style={styles.badge} info>
                            <Text>{recentData.Active}</Text>
                        </Badge>
                    </Left>
                    <Body>
                        <Text>Active</Text>
                        <Text note numberOfLines={1}>Active cases</Text>
                    </Body>
                    <Right />
                </ListItem>
            </List>
        </>
    );
};

CountryPresentational.propTypes = {
    data: PropTypes.array.isRequired,
    code: PropTypes.string.isRequired,
    inFavorites: PropTypes.bool,
    favoritesOnPress: PropTypes.func.isRequired,
};

CountryPresentational.defaultProps = {
    inFavorites: false,
};

export default React.memo(CountryPresentational);
