import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function InsideScreen() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canSummarize = text.trim().length > 0 && !loading;

  async function onSummarize() {
    setSummary('');
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Something went wrong');
        return;
      }
      setSummary(data.summary);
    } catch {
      setError('Could not connect to the server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>You are inside the app</Text>

        <View style={styles.window}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type or paste text to summarize…"
            placeholderTextColor="#9A9A9A"
            multiline
            textAlignVertical="top"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSummarize }}
            disabled={!canSummarize}
            onPress={onSummarize}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressed,
              !canSummarize && styles.disabled,
            ]}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Summarize</Text>
            )}
          </Pressable>
        </View>

        {summary ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#808080',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  window: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  input: {
    minHeight: 200,
    fontSize: 16,
    color: '#222222',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#3E3A2F',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: '#F5F5DC',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3E3A2F',
    textTransform: 'uppercase',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#3E3A2F',
  },
  error: {
    fontSize: 15,
    color: '#FFD6D6',
    textAlign: 'center',
  },
});
