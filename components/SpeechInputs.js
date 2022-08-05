import React, {useState} from 'react';
import { Text, View} from 'react-native';
import CheckBoxAndPrompt from './CheckboxAndPrompt';
import DropdownExample from './DropdownExample';
import InputAndPrompt from './InputAndPrompt';
import SaveButton from './SaveButton';

const SpeechInputs = ({ setVoice, setTalkingSpeed, voices, setNumberOfRepetitions, introduction, setIntroduction, saveIntroduction, placeholderVoice, pauseBetweenLoops, setPauseBetweenLoops, width }) => {
    return (
        <View
            style={{
                borderWidth: 5,
                borderRadius: 20,
                width: width,
                }}
        >
            <Text
                style={{
                    margin: 8,
                    fontWeight: 'bold',
                    fontSize: 20,
                }}
            >
                Speech inputs
            </Text>
            <Text style={{margin: 8}}>Language:</Text>
            <DropdownExample
                style={{margin: 100}}
                data={voices.map(voice => voice.identifier)}
                setSelected={setVoice} 
                prompt='Voice/language:'
                placeholder={placeholderVoice}
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
            <CheckBoxAndPrompt
                prompt='Pause briefly between loops?'
                value={pauseBetweenLoops}
                onValueChange={setPauseBetweenLoops}
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
            <View 
                style={{flexDirection:'row'}}
            >
                <InputAndPrompt
                    prompt='Say before pattern:'
                    defaultValue={introduction}
                    onChange={newValue => setIntroduction(newValue)}
                />
                <SaveButton 
                    active={true}
                    save={() => saveIntroduction(introduction)}
                    disableAfterSave={false}
                />
            </View>
        </View>
    )
}

export default SpeechInputs;