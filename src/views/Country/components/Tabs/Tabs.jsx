import React from 'react';
import {
    Tab as NativeBaseTab,
    Tabs as NativeBaseTabs,
} from 'native-base';
import Tab from '../Tab/Tab';

const Tabs = ({ data }) => (
    <NativeBaseTabs>
        <NativeBaseTab heading="Total">
            <Tab data={data} tabName="total" />
        </NativeBaseTab>
        <NativeBaseTab heading="Yesterday">
            <Tab data={data} tabName="yesterday" />
        </NativeBaseTab>
        <NativeBaseTab heading="2 days ago">
            <Tab data={data} tabName="2-days-ago" />
        </NativeBaseTab>
    </NativeBaseTabs>
);

Tabs.displayName = 'Tabs';
export default React.memo(Tabs);
