import { StyleSheet, Text, View } from 'react-native';

export default function InsideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are inside the app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#808080',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
