import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import CoronaTracker from './src/app/CoronaTracker';
import configureStore from './src/redux/createReduxStore';

const App = () => {
    const [loading, setLoading] = useState(true);

    const loadFonts = async () => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        setLoading(false);
    };

    useEffect(() => {
        loadFonts();
    }, []);

    return (
        <Provider store={configureStore()}>
            <CoronaTracker />
        </Provider>
    );
};

export default App;
