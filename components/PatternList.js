import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import GeneratedPattern from './GeneratedPattern';

const PatternList = ({ patterns, talkingSpeed, voice, savePattern, alreadySaved }) => {
    const patternsList = patterns.map((pattern, index) =>
        <GeneratedPattern 
            pattern={pattern} 
            hiddenPattern={'* '.repeat(pattern.length)}
            key={index}
            talkingSpeed={talkingSpeed}
            voice={voice}
            savePattern={savePattern}
            alreadySaved={alreadySaved}
        />
    );
    return (
        <View>
            {patternsList}
        </View>
    )
}

export default PatternList;