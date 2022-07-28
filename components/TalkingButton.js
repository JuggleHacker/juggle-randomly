import React from 'react';
import { Button } from 'react-native';
import * as Speech from 'expo-speech';

const TalkingButton = ({ title, textToSpeak, voice}) => {
    return (
        <Button 
            title={title} 
            onPress={() => {Speech.speak(textToSpeak, {rate: 1.3, voice:voice})} }
        />
    )
}

export default TalkingButton;