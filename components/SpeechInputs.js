import React from 'react';
import { Text} from 'react-native';
import DropdownExample from './DropdownExample';
import InputAndPrompt from './InputAndPrompt';

const SpeechInputs = ({ active, setVoice, setTalkingSpeed, voices }) => {
    if (active) {
        return (
            <>
                <Text style={{margin: 8}}>Language:</Text>
                <DropdownExample
                    style={{margin: 100}}
                    data={voices.map(voice => voice.identifier)}
                    setSelected={setVoice} 
                    prompt='Voice/language:'
                    placeholder={voices[0]?.identifier || "Choose voice"}
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
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default SpeechInputs;