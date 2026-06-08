import { Pressable, StyleSheet, Text, View } from 'react-native';
import { type Theme } from '@/constants/themes';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  theme: Theme;
  active: boolean;
  onSelect: () => void;
};

export function ThemePreviewCard({ theme: previewTheme, active, onSelect }: Props) {
  const { theme } = useTheme();
  const swatches = [
    previewTheme.colors.background,
    previewTheme.colors.surface,
    previewTheme.colors.primary,
    previewTheme.colors.text,
    previewTheme.colors.accent,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.colors.surface, opacity: pressed ? 0.8 : 1 },
        active && { borderWidth: 2, borderColor: theme.colors.accent },
      ]}
      onPress={onSelect}
    >
      <View style={styles.swatchRow}>
        {swatches.map((color, i) => (
          <View key={i} style={[styles.swatch, { backgroundColor: color }]} />
        ))}
      </View>
      <View style={styles.labelRow}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{previewTheme.name}</Text>
        <Text style={[styles.mode, { color: theme.colors.accent }]}>
          {previewTheme.dark ? 'Dark' : 'Light'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  swatch: {
    flex: 1,
    height: 32,
    borderRadius: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  mode: {
    fontSize: 13,
    fontWeight: '500',
  },
});
