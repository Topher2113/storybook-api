import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ThemedTitle } from '@/components/ThemedTitle';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <ThemedTitle style={styles.title}>Storybook</ThemedTitle>
        <ThemedText style={[styles.subtitle, { color: theme.colors.accent }]}>
          Every choice writes the next chapter
        </ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            { backgroundColor: theme.colors.primary, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => router.push('/story')}
        >
          <ThemedText style={[styles.startLabel, { color: theme.colors.background }]}>
            Begin Adventure
          </ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 52,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  startButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  startLabel: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
