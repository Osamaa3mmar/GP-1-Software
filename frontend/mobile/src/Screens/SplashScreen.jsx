import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Wait for 2 seconds to show splash screen
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if user is logged in
        const userToken = await AsyncStorage.getItem('userToken');
        
        if (userToken) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking token:', error);
        navigation.replace('Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Thuraa</Text>
      <Text style={styles.tagline}>Your Education Platform</Text>
      <ActivityIndicator size="large" color="#3366FF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3366FF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#8F9BB3',
    marginBottom: 24,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
