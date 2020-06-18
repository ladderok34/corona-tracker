import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';

const Layout = ({ children }) => (
    <Container>
        <Content>
            {children}
        </Content>
    </Container>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

Layout.displayName = 'Layout';
export default React.memo(Layout);
