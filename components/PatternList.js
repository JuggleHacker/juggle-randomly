import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import GeneratedPattern from './GeneratedPattern';

const PatternList = ({ patterns, talkingSpeed, voice, savePattern, alreadySaved, deletePattern, numberOfRepetitions, introduction, revealAll }) => {
    
    const patternsList = patterns.map((pattern, index) =>
        <GeneratedPattern 
            pattern={pattern}
            revealed={revealAll}
            hiddenPattern={'* '.repeat(pattern.length)}
            key={index}
            numberInList={index+1}
            talkingSpeed={talkingSpeed}
            voice={voice}
            savePattern={savePattern}
            alreadySaved={alreadySaved}
            numberOfRepetitions={numberOfRepetitions}
            introduction={introduction}
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