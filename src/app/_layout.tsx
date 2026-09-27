import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ title: 'Home' }} />
        <Stack.Screen
          name="inside"
          options={{
            headerShown: true,
            title: '',
            headerStyle: { backgroundColor: '#808080' },
            headerTintColor: '#FFFFFF',
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
