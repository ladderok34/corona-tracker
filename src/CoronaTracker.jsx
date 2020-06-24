import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AllCases from 'views/AllCases/AllCases';
import Case from 'views/Case/Case';
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
        <Stack.Screen name="Country" component={Country} />
    </Stack.Navigator>
);

const AllCasesNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="All Cases"
            component={AllCases}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Case"
            component={Case}
            options={({ route }) => {
                const { name } = route.params;
                let title = name.replace(/-/g, ' ');
                title = title.charAt(0).toUpperCase() + title.slice(1);

                return { title };
            }}
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
            options={{

            }}
        />
    </Stack.Navigator>
);

const Covid = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                    name="All cases"
                    component={AllCasesNavigation}
                    options={{ title: 'All cases' }}
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

export default Covid;
