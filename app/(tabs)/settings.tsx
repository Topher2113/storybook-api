import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { ThemePreviewCard } from '@/components/ThemePreviewCard';
import { themes } from '@/constants/themes';

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.heading, { color: theme.colors.text }]}>Choose Your Theme</Text>
        <Text style={[styles.subheading, { color: theme.colors.accent }]}>
          {themes.filter((t) => !t.dark).length} light · {themes.filter((t) => t.dark).length} dark
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {themes.map((t) => (
          <ThemePreviewCard
            key={t.name}
            theme={t}
            active={t.name === theme.name}
            onSelect={() => setTheme(t)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
});
