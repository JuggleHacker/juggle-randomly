import React, {useState, useEffect} from 'react';
import InputAndPrompt from './InputAndPrompt';
import { Button, StyleSheet, Text, View } from 'react-native';   
import CheckBoxAndPrompt from './CheckboxAndPrompt';
import generateRandomSiteswap from '../siteswap/SiteswapUtils';

const PatternGenerator = ({ onGeneratedNewPattern }) => {
    const [numberOfObjects, setNumberOfObjects] = useState(3)
    const [maxThrow, setMaxThrow] = useState(5)
    const [handAcrossToAvoidEmptyHand, setHandAcrossToAvoidEmptyHand] = useState(true);
    const [numberOfThrows, setNumberOfThrows] = useState(5);
    const [goBackToGroundStateWhenDone, setGoBackToGroundStateWhenDone] = useState(true);
    const [generatedPatterns, setGeneratedPatterns] = useState([]);
    const [value, setValue] = useState(0)
    
    return (
      <View
        style={{
          flex: 0.239,
          borderWidth: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: 500,
        }}
      >
        <Text
          style={{
            margin: 8,
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          Random pattern generator
        </Text>
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
          defaultValue='5'
          onChange={newInput => {
            const newMaxHeight = parseInt(newInput);
            if (!isNaN(newMaxHeight)) {
              setMaxThrow(parseInt(newMaxHeight));
            }
          }}
        />
        <InputAndPrompt 
          prompt='Number of throws:'
          defaultValue='6'
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
            const newPattern = generateRandomSiteswap(
              numberOfObjects, 
              maxThrow, 
              numberOfThrows, 
              handAcrossToAvoidEmptyHand,
              goBackToGroundStateWhenDone,
            );
            onGeneratedNewPattern(newPattern);
            setValue(value+1);
          }}
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

  export default PatternGenerator;