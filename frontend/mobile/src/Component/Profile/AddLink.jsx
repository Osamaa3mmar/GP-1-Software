import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Menu, TextInput } from "react-native-paper";

export default function AddLink({setStatus}) {
   const [info,setInfo]=useState('');
   const links=[
    "snapchat",
    "youtube",
    "twitter",
    "linkedin",
    "facebook",
    "github",

   ]
    const editBio=()=>{
        console.log(info);
    }
    const dismess=()=>{
        setStatus(false);
    }
    const [visible, setVisible] = React.useState(false);
    const [selected, setSelected] = React.useState("Choose an option");
  return (
    <View>
         <Menu
         
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Button onPress={() => setVisible(true)}>{selected}</Button>}>
            {links.map((link)=>{
            return <Menu.Item onPress={() => { setSelected(link); setVisible(false); }} key={link} title={link} />
        
            })}
          </Menu>
      <TextInput
        label="New Link"
        value={info}
        onChangeText={(info) => setInfo(info)}
        multiline
        numberOfLines={1}
        mode="outlined"
        style={{ margin: 16 }}
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