import { View, Text, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'

export default function ProfileCircle({image,name,radius,spec}) {
    const {width}=useWindowDimensions();
  return (
    <View style={styles.ProfileCircleContainer}>
        <ImageBackground style={[styles.imgContainer,{borderRadius: radius}]} source={{uri:image}}>
        </ImageBackground>
        <View style={styles.NameSpec}>
        <Text style={styles.name} >{name}</Text>
        <Text style={styles.spec} >{spec}</Text>
        </View>
    </View>
  )
}


const styles =StyleSheet.create({
    imgContainer: {
        width: 160,
        height: 160,
        overflow: "hidden",
        zIndex: 10,
        backgroundColor: '#ccc',
        borderColor:"white",
        borderStyle:"solid",
        borderWidth:3
    },
    ProfileCircleContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-end",
        gap:40,
    },
    NameSpec:{
        display:"flex",
        gap:8,
        marginBottom:16

    },
    name:{
        fontSize:24,
        fontWeight:"600",

    },
    spec:{
        fontSize:12,
        color:"#4B4B4B",
        flexWrap:"wrap",
        
    }
      
     
})