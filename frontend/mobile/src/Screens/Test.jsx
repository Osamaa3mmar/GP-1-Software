import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Test() {
    const navigate=useNavigation();
  return (
    <View>
      <Text style={{padding:100}} onPress={()=>{navigate.navigate("Profile",{
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidG94Yy5uZWJ1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoib3NhbWFfYW1tYXIiLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3NDY1MzkwNDZ9.1MXodnLAYo5lKW27XHvlTI0xmavyWeueT0ZyhIoJc20",
      isMe:"true",
        isMobile:"true",
        id:"14"
      })}}>Test</Text>
    </View>
  )
}