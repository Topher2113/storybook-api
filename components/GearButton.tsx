import { HeaderButton } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export function GearButton() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <HeaderButton
      onPress={() => router.push('/settings')}
      accessibilityLabel="Settings"
    >
      <Ionicons name="settings-outline" size={28} color={theme.colors.text} />
    </HeaderButton>
  );
}
