import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

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
      <Text style={[styles.label, { color: theme.colors.background }]}>{text}</Text>
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
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
});
