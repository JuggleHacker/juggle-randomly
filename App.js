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
  const [activeTab, setActiveTab] = useState('generating');
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [talkingSpeed, setTalkingSpeed] = useState(null);
  const [savedPatterns, setSavedPatterns] = useState([]);
  const [numberOfRepetitions, setNumberOfRepetitions] = useState(10);
  const [introduction, setIntroduction] = useState('Ready, steady, go!');

  const NavigationButtons = ({ currentTab, onTabChange }) => {
    return (
      <View style={styles.rowContainer}>
          <Button
            title='Generate patterns'
            disabled={currentTab == 'generating'}
            onPress={() => onTabChange('generating')}
          />
          <Text> </Text>
          <Button 
            title='Saved patterns'
            disabled={currentTab == 'savedPatterns'}
            onPress={() => onTabChange('savedPatterns')}
            style={{borderWidth:5}}
          />
          <Text> </Text>
          <Button
            title='Speech settings'
            disabled={currentTab == 'speechSettings'}
            onPress={() => onTabChange('speechSettings')}
            style={{borderWidth:5}}
          />
        </View>
    )
  }

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

  const storeIntroduction = async (value) => {
    try {
      console.log(`Storing ${value}`)
      await AsyncStorage.setItem('@introduction', value)
    } catch (e) {
      console.log(`saving error: ${e}`)
    }
  }

  const getIntroduction = async () => {
    try {
      const value = await AsyncStorage.getItem('@introduction')
      if(value !== null) {
        console.log(value)
        setIntroduction(value)
      }
    } catch(e) {
      console.log(`error reading value: ${e}`)
    }
  }

  useEffect(() => {
    getSavedPatterns()
  }, []);

  useEffect(() => {
    getIntroduction()
  }, []);

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then(voices => {
        setVoices(voices); 
        setVoice(voices[0].identifier)
      })
    return
  }, []);

  if (activeTab == 'generating') {
    return (
      <View style={styles.container}>
        <NavigationButtons
          currentTab={activeTab}
          onTabChange={setActiveTab}
        />
        <PatternGenerator 
            voice={voice}
            talkingSpeed={talkingSpeed}
            onGeneratedNewPattern={(newPattern) => setGeneratedPatterns(generatedPatterns.concat([newPattern]))}
        />
        { generatedPatterns.length > 0 ?
          <View
            style={{
              borderWidth: 5,
              borderRadius: 20,
              width: 500
            }}
          >
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
              deleteAllPatterns={() => setGeneratedPatterns([])}
            />
          </View>
          :
          <></>
        }
    </View>  
    )
  } else if (activeTab == 'speechSettings') {
    return (
      <View style={styles.container}>
        <NavigationButtons
          currentTab={activeTab}
          onTabChange={setActiveTab}
        />
        <SpeechInput
            setVoice={setVoice}
            setTalkingSpeed={setTalkingSpeed}
            voices={voices}
            setNumberOfRepetitions={setNumberOfRepetitions}
            introduction={introduction}
            setIntroduction={setIntroduction}
            saveIntroduction={storeIntroduction}
        />
      </View>
    )
  } else if (activeTab == 'savedPatterns') {
    return (
      <View style={styles.container}>
        <NavigationButtons
          currentTab={activeTab}
          onTabChange={setActiveTab}
        />
        <View
          style={{
            borderWidth: 5,
            borderRadius: 20,
            width: 500
          }}
        >
        { savedPatterns.length > 0 ?
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
            deleteAllPatterns={() => {
              setSavedPatterns([])
              storeSavedPatterns(JSON.stringify([]))
            }}
          />
          :
          <Text style={styles.title}>
            Save some patterns you have generated to see them here!
          </Text>
        }
          
        </View>
      </View>
    )
  }
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
