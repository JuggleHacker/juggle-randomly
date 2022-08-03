import React, { useState } from "react";
import { Text} from 'react-native';
const SaveButton = ({active, save, disableAfterSave}) => {
    const [display, setDisplay] = useState(active);
    if (display) {
        return (
            <Text
                onPress={() => {save(); if(disableAfterSave) { setDisplay(false) } }}
                style={{fontSize: 24}}
            >
                💾
            </Text>
        )
    } else {
        return (
            <Text style={{fontSize: 24}}>✔️</Text>
        )
    }
}

export default SaveButton;