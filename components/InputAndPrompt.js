import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputAndPrompt = ({ prompt, defaultValue, onChange }) => {
    const calculatedWidth = Math.max(20, defaultValue.length * 7);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{prompt}</Text>
            <TextInput
                style={{
                  alignSelf: "center",
                  borderWidth:1,
                  width:calculatedWidth
                }}
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