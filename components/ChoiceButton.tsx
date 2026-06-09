import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from '@/components/ThemedText';

type Props = {
  text: string;
  onPress: () => void;
};

export function ChoiceButton({ text, onPress }: Props) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.colors.primary, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
    >
      <ThemedText style={[styles.label, { color: theme.colors.background }]}>{text}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    lineHeight: 22,
  },
});
