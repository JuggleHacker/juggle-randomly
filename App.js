import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TalkingButton from './components/TalkingButton';
import InputAndPrompt from './components/InputAndPrompt';
import CheckBoxAndPrompt from './components/CheckboxAndPrompt';
import generateRandomSiteswap from './siteswap/SiteswapUtils';
import DropdownExample from './components/DropdownExample';
import * as Speech from 'expo-speech';
import PatternList from './components/PatternList'

export default function App() {
  const [numberOfObjects, setNumberOfObjects] = useState(3)
  const [maxThrow, setMaxThrow] = useState(6)
  const [handAcrossToAvoidEmptyHand, setHandAcrossToAvoidEmptyHand] = useState(true);
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [talkingSpeed, setTalkingSpeed] = useState(1.3);
  const [numberOfThrows, setNumberOfThrows] = useState(20);
  const [goBackToGroundStateWhenDone, setGoBackToGroundStateWhenDone] = useState(true);
  const [generatedPatterns, setGeneratedPatterns] = useState([]);


  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then(voices => {
        setVoices(voices); 
        setVoice(voices[0].identifier)
      })
    return
  }, []);

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
          }
        }}
      />
      <InputAndPrompt 
        prompt='Number of throws:'
        defaultValue='10'
        onChange={newInput => {
          const newNumberOfThrows = parseInt(newInput);
          if (!isNaN(newNumberOfThrows)) {
            setNumberOfThrows(parseInt(newNumberOfThrows)); 
          }
        }}
      />
      <CheckBoxAndPrompt 
        prompt='Hand across to avoid empty hand?'
        value={handAcrossToAvoidEmptyHand}
        onValueChange={setHandAcrossToAvoidEmptyHand}
      />
      <Text style={{margin: 8}}>Language:</Text>
      <DropdownExample
        style={{margin: 100}}
        data={voices.map(voice => voice.identifier)}
        setSelected={setVoice} 
        prompt='Voice/language:'
        placeholder={voice}
      />
      <InputAndPrompt 
        prompt='Talking speed:'
        defaultValue='1.3'
        onChange={newInput => {
          const newTalkingSpeed = parseFloat(newInput);
          if (!isNaN(newTalkingSpeed)) {
            setTalkingSpeed(newTalkingSpeed); 
          }
        }}
      />
      <Button 
        title='Generate pattern'
        onPress={() => {
          console.log("Working");
          const newPattern = generateRandomSiteswap(
            numberOfObjects, 
            maxThrow, 
            numberOfThrows, 
            handAcrossToAvoidEmptyHand,
            goBackToGroundStateWhenDone,
          );
          console.log(newPattern)
          setGeneratedPatterns(generatedPatterns.concat([newPattern.join(' ')]))
        }}
      />
      <Text style={styles.title}>Generated patterns:</Text>
      <View style={{flexDirection:'row'}}>
        <PatternList 
          patterns={generatedPatterns}
          talkingSpeed={talkingSpeed}
          voice={voice}
        />
      </View>
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
