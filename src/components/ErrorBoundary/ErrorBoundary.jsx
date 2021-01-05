import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'

class ErrorBoundary extends React.Component {
  constructor() {
    super()

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return <Text>Something went wrong!</Text>
    }

    return children
  }
}

PropTypes.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(ErrorBoundary)
