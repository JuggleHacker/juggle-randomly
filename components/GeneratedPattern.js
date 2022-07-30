import React, {useState} from 'react';
import { Button, SliderComponent, StyleSheet, Text, View } from 'react-native';
import * as Speech from 'expo-speech';

const GeneratedPattern = ({ pattern, talkingSpeed, voice }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const patternAsText = pattern.join(' ');
    const hiddenPattern = '* '.repeat(pattern.length);
    return (
        <View style={{flexDirection:'row'}}>
            <Text
                style={styles.textButton}
                onPress={() => Speech.speak(patternAsText, {rate: talkingSpeed, voice: voice})}
            >
                ▶️
            </Text>
            <Text
                style={styles.textButton}
                onPress={() => {
                    var timesLeft = 10;
                    while (timesLeft > 0 ) {
                        Speech.speak(patternAsText, {rate: talkingSpeed, voice: voice});
                        timesLeft -= 1;
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
                🔍
            </Text>
            <Text>    </Text>
            <Text style={styles.text}>
                {isRevealed ? patternAsText : hiddenPattern}
            </Text>
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