import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { GearButton } from '@/components/GearButton';
import { useFontLoader } from '@/hooks/useFontLoader';

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const { theme } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: '',
            headerBackVisible: false,
            headerRight: () => <GearButton />,
          }}
        />
        <Stack.Screen name="settings" options={{ title: 'Themes' }} />
        <Stack.Screen
          name="story"
          options={{
            headerTitle: '',
            headerBackVisible: false,
            headerRight: () => <GearButton />,
          }}
        />
      </Stack>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  const { ready } = useFontLoader();

  if (!ready) return null;

  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
