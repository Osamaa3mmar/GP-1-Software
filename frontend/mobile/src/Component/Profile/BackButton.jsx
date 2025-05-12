import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function BackButton({url,isMobile}) {
    const navigate=useNavigation();
    const {width}=useWindowDimensions();
  return (<View style={[styles.backButtonContainer,{
    top:width>600?22:45,
  }]}>
    <Button style={styles.btn} 
    onPress={()=>{navigate.navigate("Main")}}
    rippleColor={"white"}
    mode='outlined' 
    icon={"arrow-right-thick"} 
    contentStyle={{ flexDirection: 'row-reverse' }}
    labelStyle={{ color: 'white', fontSize: 16 }}>
        Back
    </Button>
    </View>
  )
}


const styles =StyleSheet.create({
    btn:{
        
        color:"white",
        borderWidth:2,
        borderColor:"white"
    },
    backButtonContainer:{
        position: "absolute",
        right:26,
    }
})