import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PatternList from './PatternList';

const GeneratedPatterns = ({ active, generatedPatterns, talkingSpeed, voice }) => {
    if (active) {
        return (
            <>
                <Text style={styles.title}>Generated patterns:</Text>
                <View style={{flexDirection:'row'}}>
                <PatternList 
                    patterns={generatedPatterns}
                    talkingSpeed={talkingSpeed}
                    voice={voice}
                />
                </View>
            </>
            
        )
    } else {
        return (
            <></>
        )
    }
}

const styles = StyleSheet.create({
    title: {
      margin: 8,
      fontWeight: 'bold',
      fontSize: 20,
    },
})

export default GeneratedPatterns;