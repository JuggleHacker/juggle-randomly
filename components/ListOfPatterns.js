import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PatternList from './PatternList';
import CheckBoxAndPrompt from './CheckboxAndPrompt';
import DeleteButton from './DeleteButton';

const ListOfPatterns = ({ title, patterns, talkingSpeed, voice, savePattern, alreadySaved, deletePattern, deleteAllPatterns, numberOfRepetitions, introduction, pauseBetweenLoops }) => {
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
                <Text style={{margin:8}}>Delete all patterns: </Text>
                <DeleteButton deletePattern={deleteAllPatterns} />
            </View>
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
                    pauseBetweenLoops={pauseBetweenLoops}
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