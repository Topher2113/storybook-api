import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

function usePulse() {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);
  return opacity;
}

export function SkeletonCard() {
  const { theme } = useTheme();
  const opacity = usePulse();
  return (
    <Animated.View style={[styles.card, { backgroundColor: theme.colors.surface, opacity }]}>
      <View style={[styles.titleBar, { backgroundColor: theme.colors.background }]} />
      <View style={[styles.bodyLine, { backgroundColor: theme.colors.background }]} />
      <View style={[styles.bodyLine, { backgroundColor: theme.colors.background }]} />
      <View style={[styles.bodyLine, styles.shorter, { backgroundColor: theme.colors.background }]} />
      <View style={[styles.bodyLine, { backgroundColor: theme.colors.background }]} />
    </Animated.View>
  );
}

export function SkeletonChoices() {
  const { theme } = useTheme();
  const opacity = usePulse();
  return (
    <Animated.View style={{ opacity, gap: 10 }}>
      <View style={[styles.buttonShape, { backgroundColor: theme.colors.surface }]} />
      <View style={[styles.buttonShape, { backgroundColor: theme.colors.surface }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  titleBar: {
    height: 28,
    borderRadius: 6,
    marginBottom: 20,
  },
  bodyLine: {
    height: 14,
    borderRadius: 4,
    marginBottom: 10,
  },
  shorter: {
    width: '75%',
  },
  buttonShape: {
    height: 50,
    borderRadius: 10,
  },
});
