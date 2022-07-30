import React, { useState } from "react";
import { Text} from 'react-native';

const DeleteButton = ({ deletePattern }) => {
    return (
        <Text
            onPress={deletePattern}
        >
            🗑️
        </Text>
    )
}

export default DeleteButton;