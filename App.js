import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TalkingButton from './components/TalkingButton';
import InputAndPrompt from './components/InputAndPrompt';
import CheckBoxAndPrompt from './components/CheckboxAndPrompt';
import generateRandomSiteswap from './siteswap/SiteswapUtils';
import DropdownExample from './components/DropdownExample';
import * as Speech from 'expo-speech';
import PatternList from './components/PatternList'
import SpeechInputs from './components/SpeechInputs';
import GeneratedPatterns from './components/GeneratedPatterns';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [count, setCount] = useState(0);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@count', value)
    } catch (e) {
      console.log(`saving error: ${e}`)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@count')
      if(value !== null) {
        setCount(value)
      }
    } catch(e) {
      console.log('error reading value')
      setCount('0') 
    }
  }

  useEffect(() => {
    getData()
  }, []);


  return (
    <View
      style={styles.container}>
      <Button 
        title={`You have pressed this button ${count} times!`} 
        onPress={() => {
          const newCount = parseInt(count) + 1;
          setCount(newCount);
          storeData(newCount)
        }}
      />
      <Button 
        title='Clear count'
        onPress={() => {setCount(0); storeData(0)}}
      />
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
      <GeneratedPatterns
        active={generatedPatterns.length >0}
        generatedPatterns={generatedPatterns}
        talkingSpeed={talkingSpeed}
        voice={voice}
      />
      <SpeechInputs
        active={generatedPatterns.length > 0}
        setVoice={setVoice}
        setTalkingSpeed={setTalkingSpeed}
        voices={voices}
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
