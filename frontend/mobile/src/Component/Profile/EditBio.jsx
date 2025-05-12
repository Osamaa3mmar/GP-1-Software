import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

export default function EditBio({setStatus}) {
   const [info,setInfo]=useState('');
    const editBio=()=>{
        console.log(info);
    }
    const dismess=()=>{
        setStatus(false);
    }
  return (
    <View>
      <TextInput
        label="Description"
        value={info}
        onChangeText={(info) => setInfo(info)}
        multiline
        numberOfLines={10}
        mode="outlined"
        style={{ margin: 10 }}
      />
    <View style={styles.btnsCont}>
      <Button onPress={dismess}>Dismess</Button>
      <Button onPress={editBio} mode='contained'>Save</Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
btnsCont:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    gap:3
}
})