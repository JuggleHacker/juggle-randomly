import React, {useState} from 'react';
import { Button, SliderComponent, StyleSheet, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';

const GeneratedPattern = ({ pattern, talkingSpeed, voice, savePattern, alreadySaved, deletePattern, numberOfRepetitions, introduction, revealed, numberInList, pauseBetweenLoops }) => {
    const [isRevealed, setIsRevealed] = useState(revealed);
    const [isSaved, setIsSaved] = useState(alreadySaved);
    const patternAsText = pattern.join(' ');
    const hiddenPattern = '* '.repeat(pattern.length);
    return (
        <View style={{flexDirection:'row'}}>
            <Text
                style={{
                    marginRight:16,
                    fontSize:24,
                    justifyContent: 'bottom',
                    alignItems:'right'
                }}
            >{numberInList}</Text>
            <Text
                style={styles.textButton}
                onPress={() => Speech.speak(introduction + patternAsText, {rate: talkingSpeed, voice: voice})}
            >
                ▶️
            </Text>
            <Text
                style={styles.textButton}
                onPress={() => {
                    var timesLeft = numberOfRepetitions;
                    Speech.speak(introduction, {rate: talkingSpeed, voice: voice})
                    if (pauseBetweenLoops) {
                        while (timesLeft > 0 ) {
                        Speech.speak(patternAsText, {rate: talkingSpeed, voice: voice});
                        timesLeft -= 1;
                        }
                    } else {
                        Speech.speak(`${patternAsText} `.repeat(numberOfRepetitions), {rate: talkingSpeed, voice: voice});
                    }
                }}
            >
                🔁
            </Text>
            <Text
                style={styles.textButton}
                onPress={() => Speech.stop()}
            >
                ⏹️
            </Text>
            <Text
                style={styles.textButton}
                onPress={() => setIsRevealed(!isRevealed)}
            >
                👀
            </Text>
            <Text>    </Text>
            <Text style={styles.text}>
                {(revealed || isRevealed) ? patternAsText : hiddenPattern}
            </Text>
            <SaveButton
                active={!isSaved}
                save={() => savePattern(pattern)}
                disableAfterSave={true}
            />
            <DeleteButton
                deletePattern={deletePattern}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginRight:40,
        justifyContent: 'left',
        alignItems:'left'
    },
    textButton: {
      fontSize: 24,
      margin: 0
    },
    buttonTitle: {
        fontSize: 48,
        height: 80,
        width: 80,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });

export default GeneratedPattern;