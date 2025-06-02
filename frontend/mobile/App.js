import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

// Import screens
import RealProfileScreen from './src/Screens/RealProfileScreen';
import Test from './src/Screens/Test';
import LoginScreen from './src/Screens/LoginScreen';
import HomeScreen from './src/Screens/HomeScreen';
import SplashScreen from './src/Screens/SplashScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  
  // Deep linking configuration
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
  
  // Main navigation stack
  const MainNavigator = () => {
    return (
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen 
          name='Splash' 
          component={SplashScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name='Login' 
          component={LoginScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name='Home' 
          component={HomeScreen} 
          options={{title: 'Thuraa Dashboard'}}
        />
        <Stack.Screen 
          name='Profile' 
          component={RealProfileScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name='Test' 
          component={Test} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer linking={linking}>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}