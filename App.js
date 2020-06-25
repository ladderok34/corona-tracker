import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import CoronaTracker from './src/CoronaTracker';

const App = () => {
    const loadFonts = async () => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
    };

    useEffect(() => {
        loadFonts();
    }, []);

    return <CoronaTracker />;
};

export default App;
