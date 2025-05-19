import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Base from "../../api/Base";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function EditSpecialization({setStatus,update}) {
   const [info,setInfo]=useState('');
    const editSpecialization=async()=>{
        try{
          const {data}=await Base.post("/user/edit/specialization",{specialization:info},{
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
        label="Specialization"
        value={info}
        onChangeText={(info) => setInfo(info)}
        multiline
        numberOfLines={1}
        mode="outlined"
        style={{ margin: 10 }}
      />
    <View style={styles.btnsCont}>
      <Button onPress={dismess}>Dismess</Button>
      <Button onPress={editSpecialization} mode='contained'>Save</Button>
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