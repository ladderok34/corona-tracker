import React from 'react';
import PropTypes from 'prop-types';
import {
    List as NativeList,
    ListItem,
    Text,
    Left,
    Right,
    Icon,
    Content,
    Badge,
} from 'native-base';
import { StyleSheet } from 'react-native';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const styles = StyleSheet.create({
    badge: {
        marginBottom: 10,
    },
});

const List = ({ countries, navigateToCountry }) => (
    <NativeList>
        {countries.map((country) => (
            <ListItem
                key={country.CountryCode}
                onPress={() => { navigateToCountry(country.CountryCode); }}
            >
                <Left>
                    <Text>{getUnicodeFlagIcon(country.CountryCode)}</Text>
                    <Text>{country.Country}</Text>
                </Left>
                <Content>
                    <Badge warning style={styles.badge}>
                        <Text>{country.TotalConfirmed} Total</Text>
                    </Badge>
                    <Badge style={styles.badge}>
                        <Text>{country.TotalDeaths} Death</Text>
                    </Badge>
                    <Badge success style={styles.badge}>
                        <Text>{country.TotalRecovered} Recovered</Text>
                    </Badge>
                    <Badge info>
                        <Text>{country.TotalConfirmed - (country.TotalRecovered + country.TotalDeaths)} Remaining</Text>
                    </Badge>
                </Content>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        ))}
    </NativeList>
);

List.propTypes = {
    countries: PropTypes.array.isRequired,
    navigateToCountry: PropTypes.func.isRequired,
};

export default React.memo(List);
