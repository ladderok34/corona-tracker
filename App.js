import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import CoronaTracker from './src/CoronaTracker';
import { Ionicons } from '@expo/vector-icons';

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

    return <CoronaTracker />;
};

export default App;
