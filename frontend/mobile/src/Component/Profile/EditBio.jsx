import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Base from "../../api/Base";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function EditBio({setStatus,update}) {
   const [info,setInfo]=useState('');
    const editBio=async()=>{
        try{
          const {data}=await Base.post("/user/edit/bio",{bio:info},{
            headers:{
              token:await AsyncStorage.getItem("token"),
            }
          })
          update();
          setStatus(false);
        }catch(error){
          console.log(error);
        }
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