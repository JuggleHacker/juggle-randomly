import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import PatternGenerator from './components/PatternGenerator';
import SavedPatterns from './components/ListOfPatterns';
import SpeechInput from './components/SpeechInputs';
import * as Speech from 'expo-speech';
import ListOfPatterns from './components/ListOfPatterns';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [generatedPatterns, setGeneratedPatterns] = useState([]);
  const [generatingPatterns, setGeneratingPatterns] = useState(true);
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [talkingSpeed, setTalkingSpeed] = useState(null);
  const [savedPatterns, setSavedPatterns] = useState([]);
  const [numberOfRepetitions, setNumberOfRepetitions] = useState(10);
  const [introduction, setIntroduction] = useState('Ready, steady, go!');

  const storeSavedPatterns = async (value) => {
    console.log(value);
    try {
      await AsyncStorage.setItem('@savedPatterns', value)
    } catch (e) {
      console.log(`saving error: ${e}`)
    }
  }

  const getSavedPatterns = async () => {
    try {
      const value = await AsyncStorage.getItem('@savedPatterns')
      if(value !== null) {
        console.log(`Saved patterns : ${value}`)
        setSavedPatterns(JSON.parse(value))
      }
    } catch(e) {
      console.log(`error reading value: ${e}`)
    }
  }

  useEffect(() => {
    getSavedPatterns()
  }, []);

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then(voices => {
        setVoices(voices); 
        setVoice(voices[0].identifier)
      })
    return
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cameron's juggling randomiser</Text>
      {(!generatingPatterns || savedPatterns.length > 0)  &&
        <View style={styles.rowContainer}>
          <Button 
            title='Generate patterns'
            disabled={generatingPatterns}
            onPress={() => setGeneratingPatterns(true)}
          />
          <Button 
            title='Saved patterns'
            disabled={!generatingPatterns}
            onPress={() => setGeneratingPatterns(false)}
          />
        </View>
      }
      {generatingPatterns ? 
        <>
          <PatternGenerator 
            voice={voice}
            talkingSpeed={talkingSpeed}
            onGeneratedNewPattern={(newPattern) => setGeneratedPatterns(generatedPatterns.concat([newPattern]))}
          />
          <ListOfPatterns
            title='Generated patterns:'
            patterns={generatedPatterns}
            active={generatedPatterns.length > 0}
            generatedPatterns={generatedPatterns}
            talkingSpeed={talkingSpeed}
            voice={voice}
            alreadySaved={false}
            introduction={introduction}
            numberOfRepetitions={numberOfRepetitions}
            savePattern={(pattern) => {
              storeSavedPatterns(JSON.stringify(savedPatterns.concat([pattern])));
              setSavedPatterns(savedPatterns.concat([pattern]));
            }}
            deletePattern={(index) => {
              setGeneratedPatterns(generatedPatterns.slice(0,index).concat(generatedPatterns.slice(index+1)))
            }}
          />
          <SpeechInput
            active={generatedPatterns.length > 0}
            setVoice={setVoice}
            setTalkingSpeed={setTalkingSpeed}
            voices={voices}
            setNumberOfRepetitions={setNumberOfRepetitions}
            introduction={introduction}
            setIntroduction={setIntroduction}
          />
        </>  
      : 
      <>
        <ListOfPatterns
        title='Saved patterns:'
        patterns={savedPatterns}
        active={savedPatterns.length > 0}
        savedPatterns={savedPatterns}
        voice={voice}
        talkingSpeed={talkingSpeed}
        alreadySaved={true}
        introduction={introduction}
        numberOfRepetitions={numberOfRepetitions}
        deletePattern={(index) => {
          setSavedPatterns(savedPatterns.slice(0,index).concat(savedPatterns.slice(index+1)))
          storeSavedPatterns(JSON.stringify(savedPatterns.slice(0,index).concat(savedPatterns.slice(index+1))));
        }}
        />
        <SpeechInput
          active={savedPatterns.length > 0}
          setVoice={setVoice}
          setTalkingSpeed={setTalkingSpeed}
          voices={voices}
          setNumberOfRepetitions={setNumberOfRepetitions}
          introduction={introduction}
          setIntroduction={setIntroduction}
        />
      </>
  }
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
  rowContainer: {
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
