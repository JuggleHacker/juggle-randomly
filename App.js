import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TalkingButton from './components/TalkingButton';
import InputAndPrompt from './components/InputAndPrompt';
import CheckBoxAndPrompt from './components/CheckboxAndPrompt';
import generateRandomSiteswap from './siteswap/SiteswapUtils';

export default function App() {
  const [numberOfObjects, setNumberOfObjects] = useState(3)
  const [maxThrow, setMaxThrow] = useState(6)
  const [siteswap, setSiteswap] = useState([5,3,1])
  const [handAcrossToAvoidEmptyHand, setHandAcrossToAvoidEmptyHand] = useState(true);
  return (
    <View
      style={styles.container}>
      <Text style={styles.title}>Cameron's juggling randomiser</Text>
      <InputAndPrompt
        prompt='Number of objects:'
        defaultValue='3'
        onChange={newInput => {
          const newNumberOfObjects = parseInt(newInput);
          if (!isNaN(newNumberOfObjects)) {
            setNumberOfObjects(parseInt(newNumberOfObjects)); 
            setSiteswap(generateRandomSiteswap(newNumberOfObjects, maxThrow, 10, handAcrossToAvoidEmptyHand));
          }
        }}
      />
      <InputAndPrompt 
        prompt='Max throw height:'
        defaultValue='6'
        onChange={newInput => {
          const newMaxHeight = parseInt(newInput);
          if (!isNaN(newMaxHeight)) {
            setMaxThrow(parseInt(newMaxHeight)); 
            setSiteswap(generateRandomSiteswap(numberOfObjects, newMaxHeight, 10, handAcrossToAvoidEmptyHand));
          }
        }}
      />
      <CheckBoxAndPrompt 
        prompt='Hand across to avoid empty hand?'
        value={handAcrossToAvoidEmptyHand}
        onValueChange={setHandAcrossToAvoidEmptyHand}
      />
      <TalkingButton 
        style={styles.label}
        title='Press me!' 
        textToSpeak={generateRandomSiteswap(numberOfObjects, maxThrow, 10, handAcrossToAvoidEmptyHand).map(i => i == 0 ? "O" : i)} 
      />
    </View>
  )
}


const styles = StyleSheet.create({
  title: {
    margin: 8,
    fontWeight: 'bold',
    fontSize: 20,
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
