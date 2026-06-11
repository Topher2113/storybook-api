import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export function GearButton() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: 8, alignItems: 'center', justifyContent: 'center' })}
      onPress={() => router.push('/settings')}
    >
      <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
    </Pressable>
  );
}
