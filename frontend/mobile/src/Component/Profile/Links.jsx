import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, IconButton } from 'react-native-paper'

export default function Links({isEdit,onPress,links}) {
    const [arr,setArr]=useState(null);
    console.log(links?.urls)
    const arr2 = [
      {
        icon: "github",
        style: {
          backgroundColor: "rgb(0,0,0)",  
          marginHorizontal: 6,
          borderColor: "black",
          color: "white", 
        },
        name: "GitHub",
      },
     
      {
        icon: "facebook",
        style: {
          backgroundColor: "#4267B2",  // Facebook blue color
          marginHorizontal: 6,
          borderColor: "#4267B2",  // Facebook blue border
          color: "white",  // White text color
        },
        name: "Facebook",
      },
      {
        icon: "linkedin",
        style: {
          backgroundColor: "#0077B5",  // LinkedIn blue color
          marginHorizontal: 6,
          borderColor: "#0077B5",  // LinkedIn blue border
          color: "white",  // White text color
        },
        name: "LinkedIn",
      },
      {
        icon: "linkedin",
        style: {
          backgroundColor: "#0077B5",  // LinkedIn blue color
          marginHorizontal: 6,
          borderColor: "#0077B5",  // LinkedIn blue border
          color: "white",  // White text color
        },
        name: "LinkedIn",
      },
      {
        icon: "twitter",
        style: {
          backgroundColor: "#1DA1F2",  // Twitter blue color
          marginHorizontal: 6,
          borderColor: "#1DA1F2",  // Twitter blue border
          color: "white",  // White text color
        },
        name: "Twitter",
      },
      {
        icon: "youtube",
        style: {
          backgroundColor: "#FF0000",  // YouTube red color
          marginHorizontal: 6,
          borderColor: "#FF0000",  // YouTube red border
          color: "white",  // White text color
        },
        name: "YouTube",
      },
      {
        icon: "snapchat",
        style: {
          backgroundColor: "#FFFC00",  // Snapchat yellow color
          marginHorizontal: 6,
          borderColor: "#FFFC00",  // Snapchat yellow border
          color: "black",  // Black text color
        },
        name: "Snapchat",
      },
     
    ];
     
      const setLinks=()=>{
       const userUrls=[];
       links?.urls?.map((item)=>{
        let type=item.type;
         arr2.forEach((item)=>{
           if(item.icon==type){
           userUrls.push({...item,url:item.url});
           }
         })
       })
       
        isEdit?userUrls.push({
          icon:"pencil",
          style: {
            backgroundColor: "rgba(102, 94, 223, 0.1)",  
            marginHorizontal: 6,
            borderColor: "rgba(102, 94, 223, 1)",
            borderStyle:"dashed",
            color: "black",  
            color:"rgba(102, 94, 223, 1)"
          },
          onPress:()=>{
            onPress("Add Link");
          },
          name: "Add",
        }):""

        setArr(userUrls);
      }
      useEffect(()=>{
        setLinks()
      },[links])
  return (
    <View style={styles.container}>
     
      <FlatList data={arr}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item})=>{return <View>
        <Button 
        onPress={item.onPress?item.onPress:()=>{}}
        icon={item.icon} 
        mode='outlined' 
      style={item.style}
      labelStyle={{color:item.style.color}}>
        {item.name}
        </Button>
        </View>}}
        horizontal
        showsHorizontalScrollIndicator={false} />
    </View>
  )
}


const styles=StyleSheet.create({
    container: {
        marginTop:70,
        padding:24,
    },
    header:{
        marginBottom:20,
        fontWeight:"600",
        fontSize:30,
    },

})


