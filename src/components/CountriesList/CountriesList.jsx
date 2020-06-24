import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    View,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { Text, Icon, Badge } from 'native-base';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import LoadingFailed from './components/LoadingFailed/LoadingFailed';

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

const CountriesList = ({
    data,
    handleEndOnReached,
    listItemOnPress,
    ...props
}) => (
    <FlatList
        {...props}
        style={styles.view}
        data={data}
        keyExtractor={item => item.countryCode}
        onEndReached={handleEndOnReached}
        onEndReachedThreshold={0.5}
        renderItem={({ index, item }) => (
            <TouchableOpacity
                onPress={() => { listItemOnPress(item.countryName, item.countryCode); }}
                activeOpacity={1}
                style={{
                    ...styles.item,
                    ...(index === data.length - 1 ? styles.lastChild : {}),
                }}
            >
                <View style={styles.text}>
                    <Text>{getUnicodeFlagIcon(item.countryCode)}</Text>
                    <Text>{item.countryName}</Text>
                </View>
                <View>
                    <Badge warning style={styles.badge}>
                        <Text>{item.confirmed} Total</Text>
                    </Badge>
                    <Badge style={styles.badge}>
                        <Text>{item.deaths} Death</Text>
                    </Badge>
                    <Badge success style={styles.badge}>
                        <Text>{item.recovered} Recovered</Text>
                    </Badge>
                    <Badge info>
                        <Text>{item.confirmed - (item.recovered + item.deaths)} Remaining</Text>
                    </Badge>
                </View>
                <View>
                    <Icon name="arrow-forward" />
                </View>
            </TouchableOpacity>
        )}
    />
);

CountriesList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        countryName: PropTypes.string,
        countryCode: PropTypes.string,
        confirmed: PropTypes.number,
        deaths: PropTypes.number,
        recovered: PropTypes.number,
    })).isRequired,
    handleEndOnReached: PropTypes.func,
    listItemOnPress: PropTypes.func.isRequired,
};

CountriesList.defaultProps = {
    data: [],
    header: null,
    handleEndOnReached: () => {},
};

CountriesList.displayName = 'CountriesList';
export default React.memo(CountriesList);
