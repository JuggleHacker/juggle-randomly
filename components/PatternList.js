import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import GeneratedPattern from './GeneratedPattern';
import renderApplication from 'react-native-web/dist/cjs/exports/AppRegistry/renderApplication';

const PatternList = ({ patterns }) => {
    const maxPatternLenght = Math.max(...patterns.map(pattern => pattern.length))
    const patternsList = patterns.map((pattern, index) =>
        <GeneratedPattern 
            pattern={pattern+' '.repeat(maxPatternLenght-pattern.length)} 
            hiddenPattern={'* '.repeat(pattern.length/2 + 1) + ' '.repeat(maxPatternLenght-pattern.length)}
            key={index}
        />
    );
    return (
        <View>
            {patternsList}
        </View>
    )
}

export default PatternList;