import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from '@/components/ThemedText';

type Props = {
  text: string;
  onPress: () => void;
};

export function ActionButton({ text, onPress }: Props) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.colors.primary, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
    >
      <ThemedText style={[styles.label, { color: theme.colors.buttonText }]}>{text}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  label: {
    fontSize: 19,
  },
});
