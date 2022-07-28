import React from 'react';
import { Button } from 'react-native';
import * as Speech from 'expo-speech';

const TalkingButton = ({ title, textToSpeak, voice, talkingSpeed}) => {
    return (
        <Button 
            title={title} 
            onPress={() => {Speech.speak(textToSpeak, {rate: talkingSpeed, voice: voice})} }
        />
    )
}

export default TalkingButton;