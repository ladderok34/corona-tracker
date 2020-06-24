import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import {
    Text,
    Icon,
    Badge,
} from 'native-base';
import { StyleSheet } from 'react-native';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'white',
        marginBottom: 120,
    },
    badge: {
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    lastChild: {
        borderBottomWidth: 0,
    },
    text: {
        flexDirection: 'row',
        width: '30%',
    },
});

const List = ({ countries, navigateToCountry, handleEndOnReached }) => (
    <FlatList
        style={styles.view}
        data={countries}
        keyExtractor={item => item.CountryCode}
        onEndReached={handleEndOnReached}
        onEndReachedThreshold={0.5}
        renderItem={({ index, item }) => (
            <TouchableOpacity
                onPress={() => { navigateToCountry(item.Country, item.CountryCode); }}
                style={{
                    ...styles.item,
                    ...(index === countries.length - 1 ? styles.lastChild : {}),
                }}
                activeOpacity={1}
            >
                <View style={styles.text}>
                    <Text>{getUnicodeFlagIcon(item.CountryCode)}</Text>
                    <Text>{item.Country}</Text>
                </View>
                <View>
                    <Badge warning style={styles.badge}>
                        <Text>{item.TotalConfirmed} Total</Text>
                    </Badge>
                    <Badge style={styles.badge}>
                        <Text>{item.TotalDeaths} Death</Text>
                    </Badge>
                    <Badge success style={styles.badge}>
                        <Text>{item.TotalRecovered} Recovered</Text>
                    </Badge>
                    <Badge info>
                        <Text>{item.TotalConfirmed - (item.TotalRecovered + item.TotalDeaths)} Remaining</Text>
                    </Badge>
                </View>
                <View>
                    <Icon name="arrow-forward" />
                </View>
            </TouchableOpacity>
        )}
    />
);

List.propTypes = {
    countries: PropTypes.array.isRequired,
    navigateToCountry: PropTypes.func.isRequired,
};

export default React.memo(List);
