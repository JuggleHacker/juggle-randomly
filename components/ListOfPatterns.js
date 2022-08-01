import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PatternList from './PatternList';
import CheckBoxAndPrompt from './CheckboxAndPrompt';

const ListOfPatterns = ({ title, patterns, talkingSpeed, voice, savePattern, alreadySaved, deletePattern, numberOfRepetitions, introduction }) => {
    const [revealAll, setRevealAll] = useState(false)
    return (
        <>
            <Text style={styles.title}>{title}</Text>
            <CheckBoxAndPrompt
                    prompt='Reveal all patterns?'
                    value={revealAll}
                    onValueChange={() => setRevealAll(!revealAll)}
            />
            <View style={{flexDirection:'row'}}>
                <PatternList 
                    patterns={patterns}
                    revealAll={revealAll}
                    talkingSpeed={talkingSpeed}
                    voice={voice}
                    savePattern={savePattern}
                    alreadySaved={alreadySaved}
                    deletePattern={deletePattern}
                    numberOfRepetitions={numberOfRepetitions}
                    introduction={introduction}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
      margin: 8,
      fontWeight: 'bold',
      fontSize: 20,
    },
})

export default ListOfPatterns;