import React from 'react'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import { List as NativeBaseList, ListItem, Text, Left, Body, Right, Badge } from 'native-base'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { prettifyNumber } from 'utils'

const styles = StyleSheet.create({
  badge: {
    width: 110,
  },
})

const List = ({ cases }) => (
  <ErrorBoundary>
    <NativeBaseList>
      <ListItem thumbnail style={styles.listItem}>
        <Left>
          <Badge style={styles.badge} info>
            <Text>{prettifyNumber(cases.TotalConfirmed)}</Text>
          </Badge>
        </Left>
        <Body>
          <Text>Total</Text>
          <Text note numberOfLines={1}>
            Total confirmed cases
          </Text>
        </Body>
        <Right />
      </ListItem>
      <ListItem thumbnail style={styles.listItem}>
        <Left>
          <Badge style={styles.badge} error>
            <Text>{prettifyNumber(cases.TotalDeaths)}</Text>
          </Badge>
        </Left>
        <Body>
          <Text>Deaths</Text>
          <Text note numberOfLines={1}>
            Total confirmed deaths
          </Text>
        </Body>
        <Right />
      </ListItem>
      <ListItem thumbnail style={styles.listItem}>
        <Left>
          <Badge style={styles.badge} success>
            <Text>{prettifyNumber(cases.TotalRecovered)}</Text>
          </Badge>
        </Left>
        <Body>
          <Text>Recovered</Text>
          <Text note numberOfLines={1}>
            Total recovered
          </Text>
        </Body>
        <Right />
      </ListItem>
      <ListItem thumbnail style={styles.listItem}>
        <Left>
          <Badge style={styles.badge} warning>
            <Text>{prettifyNumber(cases.NewConfirmed)}</Text>
          </Badge>
        </Left>
        <Body>
          <Text>New Cases</Text>
          <Text note numberOfLines={1}>
            New confirmed cases
          </Text>
        </Body>
        <Right />
      </ListItem>
      <ListItem thumbnail style={styles.listItem}>
        <Left>
          <Badge style={styles.badge} danger>
            <Text>{prettifyNumber(cases.NewDeaths)}</Text>
          </Badge>
        </Left>
        <Body>
          <Text>New Deaths</Text>
          <Text note numberOfLines={1}>
            New confirmed deaths
          </Text>
        </Body>
        <Right />
      </ListItem>
      <ListItem thumbnail style={styles.listItem}>
        <Left>
          <Badge style={styles.badge} success>
            <Text>{prettifyNumber(cases.NewRecovered)}</Text>
          </Badge>
        </Left>
        <Body>
          <Text>New Recovered</Text>
          <Text note numberOfLines={1}>
            New NewRecovered
          </Text>
        </Body>
        <Right />
      </ListItem>
    </NativeBaseList>
  </ErrorBoundary>
)

List.propTypes = {
  cases: PropTypes.object.isRequired,
}

export default React.memo(List)
