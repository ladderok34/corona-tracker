import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, Text, Left, Right, Body, Badge } from 'native-base'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import { StyleSheet } from 'react-native'
import { prettifyNumber } from 'utils'

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
})

const Tab = ({ data }) => (
  <ErrorBoundary>
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
  </ErrorBoundary>
)

Tab.propTypes = {
  data: PropTypes.object.isRequired,
}

export default React.memo(Tab)
