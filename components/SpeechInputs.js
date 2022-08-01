import React from 'react';
import { Text, View} from 'react-native';
import DropdownExample from './DropdownExample';
import InputAndPrompt from './InputAndPrompt';

const SpeechInputs = ({ active, setVoice, setTalkingSpeed, voices, setNumberOfRepetitions, introduction, setIntroduction }) => {
    if (active) {
        return (
            <View
                style={{
                    flex: 0.3,
                    borderWidth: 5,
                    width: 500,
                  }}
            >
                <Text style={{margin: 8}}>Language:</Text>
                <DropdownExample
                    style={{margin: 100}}
                    data={voices.map(voice => voice.identifier)}
                    setSelected={setVoice} 
                    prompt='Voice/language:'
                    placeholder={voices[0]?.identifier || "Choose voice"}
                />
                <InputAndPrompt 
                    prompt='Repititions when looping:'
                    defaultValue='10'
                    onChange={newInput => {
                    const newRepititions = parseInt(newInput);
                    if (!isNaN(newRepititions)) {
                        setNumberOfRepetitions(newRepititions); 
                    }
                    }}
                />
                <InputAndPrompt 
                    prompt='Talking speed:'
                    defaultValue='1.1'
                    onChange={newInput => {
                    const newTalkingSpeed = parseFloat(newInput);
                    if (!isNaN(newTalkingSpeed)) {
                        setTalkingSpeed(newTalkingSpeed); 
                    }
                    }}
                />
                <InputAndPrompt
                    prompt='Say before pattern:'
                    defaultValue={introduction}
                    onChange={newValue => setIntroduction(newValue)}
                />
            </View>
        )
    } else {
        return (
            <></>
        )
    }
}

export default SpeechInputs;