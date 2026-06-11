import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ThemedTitle } from '@/components/ThemedTitle';
import { ThemedText } from '@/components/ThemedText';
import { ActionButton } from '@/components/ActionButton';

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
        <ThemedText style={styles.subtitle}>
          Every choice writes the next chapter
        </ThemedText>
        <ActionButton text="Begin Adventure" onPress={() => router.push('/story')} />
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
    fontSize: 56,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 26,
  },
});
