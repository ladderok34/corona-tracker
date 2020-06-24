import React from 'react';
import PropTypes from 'prop-types';
import {
    List as NativeBaseList,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Badge,
} from 'native-base';
import { StyleSheet } from 'react-native';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const styles = StyleSheet.create({
    badge: {
        marginBottom: 10,
    },
});

const List = ({
    countries,
    countryNames,
    navigateToCountry,
}) => (
    <NativeBaseList>
        {countries.map((country) => {
            const currentCountry = countryNames.find(item => item.name === country.Country);

            if (typeof currentCountry === 'undefined') {
                return null;
            }

            return (
                <ListItem
                    key={country.Country}
                    onPress={() => { navigateToCountry(country.Country, currentCountry.code); }}
                >
                    <Left>
                        <Text>{getUnicodeFlagIcon(currentCountry.code)}</Text>
                        <Text>{country.Country}</Text>
                    </Left>
                    <Body>
                        <Badge warning style={styles.badge}>
                            <Text>{country.Confirmed} Total</Text>
                        </Badge>
                        <Badge style={styles.badge}>
                            <Text>{country.Deaths} Death</Text>
                        </Badge>
                        <Badge success style={styles.badge}>
                            <Text>{country.Recovered} Recovered</Text>
                        </Badge>
                        <Badge info>
                            <Text>{country.Confirmed - (country.Recovered + country.Deaths)} Remaining</Text>
                        </Badge>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            );
        })}
    </NativeBaseList>
);

List.propTypes = {
    countries: PropTypes.array.isRequired,
    countryNames: PropTypes.array.isRequired,
    navigateToCountry: PropTypes.func.isRequired,
};

List.displayName = 'List';
export default React.memo(List);
