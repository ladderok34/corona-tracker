import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Icon, Badge } from 'native-base'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { prettifyNumber } from 'utils'

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    marginBottom: 140,
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
    width: '45%',
  },
  arrow: {
    color: '#62B1F6',
  },
})

const CountriesList = ({ data, handleEndOnReached, listItemOnPress, ...props }) => (
  <ErrorBoundary>
    <FlatList
      {...props}
      style={styles.view}
      data={data}
      keyExtractor={(item) => item.countryCode}
      onEndReached={handleEndOnReached}
      onEndReachedThreshold={0.5}
      renderItem={({ index, item }) => (
        <TouchableOpacity
          onPress={() => {
            listItemOnPress(item)
          }}
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
              <Text>{prettifyNumber(item.confirmed)} Total</Text>
            </Badge>
            <Badge style={styles.badge}>
              <Text>{prettifyNumber(item.deaths)} Death</Text>
            </Badge>
            <Badge success style={styles.badge}>
              <Text>{prettifyNumber(item.recovered)} Recovered</Text>
            </Badge>
            <Badge info>
              <Text>{prettifyNumber(item.confirmed - (item.recovered + item.deaths))} Remaining</Text>
            </Badge>
          </View>
          <Icon name="arrow-forward" style={styles.arrow} />
        </TouchableOpacity>
      )}
    />
  </ErrorBoundary>
)

CountriesList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      countryName: PropTypes.string,
      countryCode: PropTypes.string,
      confirmed: PropTypes.number,
      deaths: PropTypes.number,
      recovered: PropTypes.number,
    })
  ).isRequired,
  handleEndOnReached: PropTypes.func,
  listItemOnPress: PropTypes.func.isRequired,
}

CountriesList.defaultProps = {
  data: [],
  header: null,
  handleEndOnReached: () => {},
}

export default React.memo(CountriesList)
