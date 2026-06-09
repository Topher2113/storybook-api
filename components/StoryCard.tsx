import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedTitle } from '@/components/ThemedTitle';
import { ThemedText } from '@/components/ThemedText';

type Props = {
  title: string;
  text: string;
  endingName?: string;
};

export function StoryCard({ title, text, endingName }: Props) {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <ThemedTitle style={styles.title}>{title}</ThemedTitle>
      {endingName && (
        <View style={[styles.endingBadge, { backgroundColor: theme.colors.primary }]}>
          <ThemedText style={[styles.endingText, { color: theme.colors.background }]}>
            {endingName}
          </ThemedText>
        </View>
      )}
      <ThemedText style={styles.body}>{text}</ThemedText>
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
    marginBottom: 12,
    lineHeight: 30,
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
    letterSpacing: 0.5,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
  },
});
