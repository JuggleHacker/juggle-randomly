import React from 'react';
import { Button } from 'react-native';
import * as Speech from 'expo-speech';

const TalkingButton = ({ title, textToSpeak}) => {
    return (
        <Button 
            title={title} 
            onPress={() => {console.log(`I will now say: ${textToSpeak}`); Speech.speak(textToSpeak, {rate: 1.3})} }
        />
    )
}

export default TalkingButton;