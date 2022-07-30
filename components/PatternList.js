import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import GeneratedPattern from './GeneratedPattern';

const PatternList = ({ patterns, talkingSpeed, voice, savePattern, alreadySaved, deletePattern }) => {
    const patternsList = patterns.map((pattern, index) =>
        <GeneratedPattern 
            pattern={pattern} 
            hiddenPattern={'* '.repeat(pattern.length)}
            key={index}
            talkingSpeed={talkingSpeed}
            voice={voice}
            savePattern={savePattern}
            alreadySaved={alreadySaved}
            deletePattern={() => deletePattern(index)}
        />
    );
    return (
        <View>
            {patternsList}
        </View>
    )
}

export default PatternList;