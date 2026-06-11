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

export function useFontLoader() {
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

  return { ready: fontsLoaded || !!fontError };
}
