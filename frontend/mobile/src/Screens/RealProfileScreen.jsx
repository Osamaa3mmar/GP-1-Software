import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Divider, TextInput } from 'react-native-paper';
import BackButton from '../Component/Profile/BackButton';
import Links from '../Component/Profile/Links';
import Bio from '../Component/Profile/Bio';
import EnrollmentsInfo from '../Component/Profile/EnrollmentsInfo';
import ProfileCircle from '../Component/Profile/ProfileCircle';
import Courses from '../Component/Profile/Courses';
import { useRoute } from '@react-navigation/native';
import CustomDialog from '../Component/Profile/CustomDialog';
import EditBio from '../Component/Profile/EditBio';
import EditName from '../Component/Profile/EditName';
import AddLink from '../Component/Profile/AddLink';
import axios from 'axios';
import Base from '../api/Base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditSpecialization from '../Component/Profile/EditSpecialization';

export default function RealProfileScreen() {
    const route=useRoute();
    const {isMe,token,isMobile,id}=route.params;
    const [content,setContent]=useState(null);
    const [current,setCurrent]=useState(null);
   const [status, setStatus] =useState(false);
   const [user,setUser]=useState(null);
   const setTokenAgain=async()=>{
    await AsyncStorage.setItem("token",token);
   }
   setTokenAgain();
   const anyDialog=(text)=>{
    if(text=="bio"){
        setContent( <EditBio update={getData} setStatus={setStatus}/>)
    }else if(text=="Add Link"){
        setContent(<AddLink update={getData} setStatus={setStatus}/>)
    }
    else if(text=="specialization"){
        setContent(<EditSpecialization update={getData} setStatus={setStatus}/>)
    }
    setStatus(true);
    setCurrent(text);
   }

   const getData=async()=>{
    try{
        const {data}=await Base.post("/user/fullprofile",{
            id
        },
    {
        headers: {
            token: token,
          },
    })
    setUser(data.user);
    }catch(error){
        console.log(error);
    }
   }
    const profileImage=user?.profilePic;
    useEffect(()=>{
        getData();
    },[id,token])
  return (
    <ScrollView style={styles.profileContainer}>
        <ImageBackground blurRadius={7} style={styles.profileImage} source={{uri:profileImage}}>
            <View style={styles.blurImage}></View>
            <View style={styles.circle}>
            <ProfileCircle isEdit={isMe} onPress={anyDialog} radius={20} spec={user?user.specialization?user.specialization:"Not Specilaized":''} name={user?.username} image={profileImage}/>
            </View>
           {isMobile?
           <BackButton isMobile={isMobile} url={"Home"}/>
           :""} 
        </ImageBackground>
        <Links links={user?user.links?user.links:[]:''} isEdit={isMe} onPress={anyDialog}/>
        <Bio text={user?.bio} isEdit={isMe} onPress={anyDialog}/>
        <Divider/>
        <Courses courses={user?.enrollments}/>
        <CustomDialog setStatus={setStatus} current={current} status={status}>
            {content}
        </CustomDialog>
       
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        backgroundColor:"#f5f2fa",
        
    },
    profileImage: {
        height: 200,
        width: '100%',
        position: 'relative', 
       
      },
    blurImage:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:"rgba(0,0,0,0.2)",
        
    },
    circle:{
        position:"absolute",
        bottom:-80,
        left:10,
    }
})