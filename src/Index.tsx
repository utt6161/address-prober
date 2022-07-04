
// import of react fixes this
// https://github.com/expo/expo/issues/17779
import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from "./styles/styles"
import Form from "./components/Form"
import SavedHistory from './components/SavedHistory';
import {
    OxygenMono_400Regular,
    useFonts
} from '@expo-google-fonts/oxygen-mono'
import { 
    MajorMonoDisplay_400Regular 
  } from '@expo-google-fonts/major-mono-display'
export default function Index() {
    let [fontsLoaded] = useFonts({
        OxygenMono_400Regular,
        MajorMonoDisplay_400Regular
    });
    return (
        <View style={[styles.bg_container]}>
            <LinearGradient
                // Background Linear Gradient
                colors={["rgba(91,0,137,0.8)", "rgba(247,0,107,1)"]}
                style={styles.background}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            />
            
            { fontsLoaded && <View style = {styles.content}>
                <Text style = {[
                    styles.headline, 
                    styles.monohead, 
                    styles.white_text
                ]}>Address search</Text>
                <Text style = {[
                    styles.monotext, 
                    {"fontSize": 12}, 
                    styles.white_text
                ]}>Please enter your address</Text>
                <SavedHistory/>
                <Form style = {[styles.form, styles.top_line]}/>
            </View> }
        </View>
    );
}

