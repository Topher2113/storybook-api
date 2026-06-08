import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  title: string;
  text: string;
  endingName?: string;
};

export function StoryCard({ title, text, endingName }: Props) {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {endingName && (
        <View style={[styles.endingBadge, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.endingText, { color: theme.colors.background }]}>
            {endingName}
          </Text>
        </View>
      )}
      <Text style={[styles.body, { color: theme.colors.text }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 28,
  },
  endingBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  endingText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
  },
});
