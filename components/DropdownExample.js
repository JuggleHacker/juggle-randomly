import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
 
const DropdownExample = ({ setSelected }) => {
    const data = ['Mango', 'Banana', 'Apple']
    return (
            <SelectList
                placeholder='Voice/Language'
                data={data}
                setSelected={setSelected}
            />
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginBottom: 20,
    },
    input: {
      alignSelf: "center",
      borderWidth:1,
      width: 40
    },
    label: {
      margin: 8,
    },
  });

export default DropdownExample