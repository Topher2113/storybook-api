import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { ThemePreviewCard } from '@/components/ThemePreviewCard';
import { themes } from '@/constants/themes';

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();
  const [frozenTheme] = useState(theme);
  const lightCount = themes.filter((t) => !t.dark).length;
  const darkCount = themes.filter((t) => t.dark).length;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: frozenTheme.colors.background }]}
    >
      <View style={[styles.subheader, { backgroundColor: frozenTheme.colors.background }]}>
        <Text style={[styles.count, { color: frozenTheme.colors.accent, fontFamily: frozenTheme.fonts.body }]}>
          {lightCount} light · {darkCount} dark
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
  subheader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  count: {
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
});
