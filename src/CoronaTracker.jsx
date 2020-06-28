import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AllCases from 'views/AllCases/AllCases';
import Countries from 'views/Countries/Countries';
import Country from 'views/Country/Country';
import Favorites from 'views/Favorites/Favorites';
import configureStore from './redux/createReduxStore';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const store = configureStore();

const CountriesNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Countries"
            component={Countries}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Country"
            component={Country}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const FavoritesNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Country"
            component={Country}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const CoronaTracker = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                    name="All cases"
                    component={AllCases}
                    options={{ title: 'All cases', headerShown: false }}
                />
                <Drawer.Screen
                    name="Countries"
                    component={CountriesNavigation}
                />
                <Drawer.Screen
                    name="Favorites"
                    component={FavoritesNavigation}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    </Provider>
);

export default CoronaTracker;