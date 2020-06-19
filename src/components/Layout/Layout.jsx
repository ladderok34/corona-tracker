import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import LayoutHeader from 'components/LayoutHeader/LayoutHeader';

const Layout = ({
    children,
    showHeader,
    contentProps,
}) => (
    <Container>
        {showHeader && <LayoutHeader />}
        <Content {...contentProps}>
            {children}
        </Content>
    </Container>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    showHeader: PropTypes.bool,
    contentProps: PropTypes.object,
};

Layout.defaultProps = {
    showHeader: true,
    contentProps: {},
};

Layout.displayName = 'Layout';
export default React.memo(Layout);
