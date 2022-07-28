import React, { useState } from 'react';
import { CheckBox, StyleSheet, Text, View } from 'react-native';
import TalkingButton from './components/TalkingButton';
import InputAndPrompt from './components/InputAndPrompt';
import CheckBoxAndPrompt from './components/CheckboxAndPrompt';

function stateAftermakingThrow(state, throwToMake) {
  if (state[0] == 0) {
      if (throwToMake == 0) {
          return state.slice(1)
      } else {
          throw `Trying to throw a ${throwToMake} but don't have an object to throw! State is ${state}`
      }
  } else {
      const paddedState = throwToMake >= state.length ? state.concat(Array(1 + throwToMake - state.length).fill(0)) : state.slice()
      if (paddedState[throwToMake] != 0) {
          throw `Cannot throw a ${throwToMake} because it would collide! State is ${paddedState}`
      } else {
          paddedState[throwToMake] = 1
          return paddedState.slice(1)
      }
  }
}

function validThrows(state, candidateThrows) {
  if (state[0] == 0) {
      return [0]
  } else {
      const heighestThrow = Math.max(...candidateThrows)
      const paddedState =  heighestThrow >= state.length ? state.concat(Array(1 + heighestThrow - state.length).fill(0)) : state.slice()
      return candidateThrows.filter(throwHeight => paddedState[throwHeight] == 0)
  }
}

function generateRandomSiteswap(numberOfObjects, maxThrowHeight, throwsToMake, handAcrossToAvoidEmptyHand) {
  const groundState = Array(numberOfObjects).fill(1)
  var throwsMade = 0
  var state = groundState.slice()
  var siteswap = []
  while (throwsMade < throwsToMake || JSON.stringify(state) != JSON.stringify(groundState)) {
    const possibleThrows = validThrows(state, [...Array(maxThrowHeight+1).keys()])
    const chosenThrow = state[1] == 0 && handAcrossToAvoidEmptyHand ? 1 : possibleThrows[Math.floor(Math.random() * possibleThrows.length)]
    throwsMade += 1
    state = stateAftermakingThrow(state, chosenThrow)
    siteswap = siteswap.concat(chosenThrow)
  }
  return siteswap
}

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
