import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllCases from 'components/AllCases/AllCases';
import Country from 'components/Country/Country';

const Stack = createStackNavigator();

const Covid = () => (
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
);

export default Covid;
