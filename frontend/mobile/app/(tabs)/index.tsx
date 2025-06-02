import { Image } from 'expo-image';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <Image
          source={require('@/assets/images/adaptive-icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Welcome to EduHub Mobile</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.messageContainer}>
          <ThemedText style={styles.message}>
            Your gateway to online learning, anytime, anywhere.
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Continue your learning journey with our mobile experience.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
});
