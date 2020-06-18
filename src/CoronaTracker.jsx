import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllCases from 'components/AllCases/AllCases';
import Country from 'components/Country/Country';
import configureStore from './redux/createReduxStore';

const Stack = createStackNavigator();
const store = configureStore();

const Covid = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="All cases"
                    component={AllCases}
                    options={{ title: 'All cases' }}
                />
                <Stack.Screen name="Country" component={Country} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
);

export default Covid;
