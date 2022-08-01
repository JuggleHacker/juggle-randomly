import React, { useState } from "react";
import { Text} from 'react-native';

const DeleteButton = ({ deletePattern }) => {
    return (
        <Text
            onPress={deletePattern}
            style={{fontSize:24}}
        >
            🗑️
        </Text>
    )
}

export default DeleteButton;