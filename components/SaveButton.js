import React, { useState } from "react";
import { Text} from 'react-native';
const SaveButton = ({active, save}) => {
    const [display, setDisplay] = useState(active);
    if (display) {
        return (
            <Text
                onPress={() => {save(); setDisplay(false)}}
            >
                💾
            </Text>
        )
    } else {
        return (
            <></>
        )
    }
}

export default SaveButton;