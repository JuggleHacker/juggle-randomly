import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputAndPrompt = ({ prompt, defaultValue, onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{prompt}</Text>
            <TextInput
                style={styles.input}
                defaultValue={defaultValue}
                onChangeText={(newText) => onChange(newText)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginBottom: 2,
    },
    input: {
      alignSelf: "center",
      borderWidth:1,
      width: 40
    },
    label: {
      margin: 8,
    },
  });

export default InputAndPrompt