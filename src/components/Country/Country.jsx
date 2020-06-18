import React from 'react';
import { Text } from 'react-native';
import Layout from 'components/Layout/Layout';

const Country = () => {
    return (
        <Layout>
            <Text>Country</Text>
        </Layout>
    );
};

Country.displayName = "Country";
export default React.memo(Country);
