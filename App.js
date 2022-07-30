import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import PatternGenerator from './components/PatternGenerator';
import SavedPatterns from './components/ListOfPatterns';
import SpeechInput from './components/SpeechInputs';
import * as Speech from 'expo-speech';
import ListOfPatterns from './components/ListOfPatterns';

export default function App() {
  const [savedPatterns, setSavedPatterns] = useState([]);
  const [generatedPatterns, setGeneratedPatterns] = useState([]);
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [talkingSpeed, setTalkingSpeed] = useState(null);

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
      <PatternGenerator 
        voice={voice}
        talkingSpeed={talkingSpeed}
        onGeneratedNewPattern={(newPattern) => setGeneratedPatterns(generatedPatterns.concat([newPattern]))}
      />
      <SpeechInput
        active={generatedPatterns.length > 0 || savedPatterns.length > 0}
        setVoice={setVoice}
        setTalkingSpeed={setTalkingSpeed}
        voices={voices}
      />
      <ListOfPatterns
        title='Generated patterns:'
        patterns={generatedPatterns}
        active={generatedPatterns.length > 0}
        generatedPatterns={generatedPatterns}
        talkingSpeed={talkingSpeed}
        voice={voice}
      />
      <ListOfPatterns
        title='Saved patterns:'
        patterns={savedPatterns}
        active={savedPatterns.length > 0}
        savedPatterns={savedPatterns}
        voice={voice}
        talkingSpeed={talkingSpeed}
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
