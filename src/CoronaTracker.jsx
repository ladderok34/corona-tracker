import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AllCases from 'components/AllCases/AllCases';
import Countries from 'components/Countries/Countries';
import Country from 'components/Country/Country';
import configureStore from './redux/createReduxStore';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const store = configureStore();

const CountriesNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen name="Countries" component={Countries} />
        <Stack.Screen name="Country" component={Country} />
    </Stack.Navigator>
);

const Covid = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                    name="All cases"
                    component={AllCases}
                    options={{ title: 'All cases' }}
                />
                <Drawer.Screen
                    name="Countries"
                    component={CountriesNavigation}
                    options={{ title: 'Countries' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    </Provider>
);

export default Covid;
