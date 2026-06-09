import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Lora_400Regular } from '@expo-google-fonts/lora';
import { Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { EBGaramond_400Regular } from '@expo-google-fonts/eb-garamond';
import { Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { CinzelDecorative_700Bold } from '@expo-google-fonts/cinzel-decorative';
import { CrimsonText_400Regular } from '@expo-google-fonts/crimson-text';
import { Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Merriweather_400Regular } from '@expo-google-fonts/merriweather';
import { IMFellEnglish_400Regular_Italic } from '@expo-google-fonts/im-fell-english';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const { theme } = useTheme();
  const router = useRouter();

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
            headerRight: () => (
              <Pressable
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, marginRight: 16, alignItems: 'center', justifyContent: 'center' })}
                onPress={() => router.push('/settings')}
              >
                <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="settings" options={{ title: 'Themes' }} />
        <Stack.Screen name="story" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_700Bold,
    Lora_400Regular,
    Cinzel_700Bold,
    EBGaramond_400Regular,
    Nunito_700Bold,
    Nunito_400Regular,
    CinzelDecorative_700Bold,
    CrimsonText_400Regular,
    Oswald_700Bold,
    Merriweather_400Regular,
    IMFellEnglish_400Regular_Italic,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
