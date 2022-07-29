import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Speech from 'expo-speech';

const GeneratedPattern = ({ pattern, hiddenPattern }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    return (
        <View style={{flexDirection:'row'}}>
            <Button
                style={styles.button}
                onPress={() => Speech.speak(pattern)}
                title='▶️'
            />
            <Button
                style={styles.button}
                onPress={() => setIsRevealed(!isRevealed)}
                title='❔'
            />
            <Text>    </Text>
            <Text style={styles.text}>
                {isRevealed ? pattern : hiddenPattern}
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
    button: {
      height: 90,
      width: 90,
      color: "white",
      fontSize: 16,
      alignContent:'right',
      alignContent:'right'
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