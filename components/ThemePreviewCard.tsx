import { Pressable, StyleSheet, Text, View } from 'react-native';
import { type Theme } from '@/constants/themes';

type Props = {
  theme: Theme;
  active: boolean;
  onSelect: () => void;
};

export function ThemePreviewCard({ theme: previewTheme, active, onSelect }: Props) {
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
        { backgroundColor: previewTheme.colors.surface, opacity: pressed ? 0.8 : 1 },
        active && { borderWidth: 2, borderColor: previewTheme.colors.accent },
      ]}
      onPress={onSelect}
    >
      <View style={styles.swatchRow}>
        {swatches.map((color, i) => (
          <View key={i} style={[styles.swatch, { backgroundColor: color }]} />
        ))}
      </View>
      <View style={styles.labelRow}>
        <Text style={[styles.name, { color: previewTheme.colors.text, fontFamily: previewTheme.fonts.heading }]}>
          {previewTheme.name}
        </Text>
        <Text style={[styles.mode, { color: previewTheme.colors.accent, fontFamily: previewTheme.fonts.body }]}>
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
    fontSize: 18,
  },
  mode: {
    fontSize: 15,
  },
});
