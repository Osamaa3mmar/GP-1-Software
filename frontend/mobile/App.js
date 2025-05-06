import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RealProfileScreen from './src/Screens/RealProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import Test from './src/Screens/Test';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

export default function App() {
  const Stack=createNativeStackNavigator();
  const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
      screens: {
        Profile: {
          path: 'profile/:token',
          parse: {
            token: (token) => token,
            isMe: (value) => value === 'true',
            isMobile: (value) => value === 'true',
            id: (value) => value, // Keep as string or parseInt(value) if needed
          },
        },
      },
    },
  };
  
  const ProfileLayout=()=>{
    return (
      <Stack.Navigator initialRouteName='Test'>
        <Stack.Screen name='Profile' options={{headerShown:false}} component={RealProfileScreen}></Stack.Screen>
        <Stack.Screen name='Test' options={{headerShown:false}} component={Test}></Stack.Screen>
      </Stack.Navigator>
    )
  }
  return (
    <PaperProvider theme={DefaultTheme }>
    <NavigationContainer linking={linking}>
      <ProfileLayout/>
    </NavigationContainer>
    </PaperProvider>
  )
}