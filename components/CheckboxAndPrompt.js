import React from 'react';
import { CheckBox, StyleSheet, Text, View } from 'react-native';

const CheckBoxAndPrompt = ({ prompt, value, onValueChange }) => {
    return (
        <View style={styles.checkboxContainer}>
            <Text style={styles.label}>{prompt}</Text>
            <CheckBox
                value={value}
                onValueChange={onValueChange}
                style={styles.checkbox}
            />
        </View>
    )
}

export default CheckBoxAndPrompt;

const styles = StyleSheet.create({
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