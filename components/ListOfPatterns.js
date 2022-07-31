import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PatternList from './PatternList';

const ListOfPatterns = ({ title, active, patterns, talkingSpeed, voice, savePattern, alreadySaved, deletePattern, numberOfRepetitions }) => {
    if (active) {
        return (
            <>
                <Text style={styles.title}></Text>
                <View style={{flexDirection:'row'}}>
                    <PatternList 
                        patterns={patterns}
                        talkingSpeed={talkingSpeed}
                        voice={voice}
                        savePattern={savePattern}
                        alreadySaved={alreadySaved}
                        deletePattern={deletePattern}
                        numberOfRepetitions={numberOfRepetitions}
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

export default ListOfPatterns;