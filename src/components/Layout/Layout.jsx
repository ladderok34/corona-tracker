import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';

const Layout = ({ children, contentProps }) => (
    <Container>
        <Content {...contentProps}>
            {children}
        </Content>
    </Container>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    contentProps: PropTypes.object,
};

Layout.defaultProps = {
    contentProps: {},
};

Layout.displayName = 'Layout';
export default React.memo(Layout);
