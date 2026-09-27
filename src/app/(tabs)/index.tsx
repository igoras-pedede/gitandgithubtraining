import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/inside')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Click me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#3E3A2F',
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#3E3A2F',
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5DC',
  },
});
