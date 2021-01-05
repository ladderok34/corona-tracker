import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import { Header as NativeBaseHeader, Title, Text, Button, Left, Right, Body, Icon } from 'native-base'
import { StyleSheet } from 'react-native'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inFavorites: {
    color: '#f0ad4e',
  },
  notInFavorites: {
    color: '#ccc',
  },
})

const Header = ({ countryName, countryCode, inFavorites, favoritesOnPress, goBack }) => (
  <ErrorBoundary>
    <NativeBaseHeader style={styles.header}>
      <Left>
        <Button transparent onPress={goBack}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Title>
        {getUnicodeFlagIcon(countryCode)} {countryName}
      </Title>
      <Right>
        <Button transparent onPress={favoritesOnPress}>
          <Icon name="star" style={inFavorites ? styles.inFavorites : styles.notInFavorites} />
        </Button>
      </Right>
    </NativeBaseHeader>
  </ErrorBoundary>
)

Header.propTypes = {
  countryName: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  inFavorites: PropTypes.bool,
  favoritesOnPress: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
}

Header.defaultProps = {
  inFavorites: false,
}

export default React.memo(Header)
