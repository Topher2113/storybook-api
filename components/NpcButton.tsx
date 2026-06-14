import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from '@/components/ThemedText';

type Props = {
  name: string;
  onPress: () => void;
};

export function NpcButton({ name, onPress }: Props) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { borderColor: theme.colors.text, opacity: pressed ? 0.6 : 1 },
      ]}
      onPress={onPress}
    >
      <ThemedText style={[styles.label, { color: theme.colors.text }]}>Talk to {name}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
});
