import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export function SkeletonLoader() {
  const { theme } = useTheme();
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

  return (
    <Animated.View style={{ opacity }}>
      <View style={[styles.titleBar, { backgroundColor: theme.colors.surface }]} />
      <View style={[styles.bodyLine, { backgroundColor: theme.colors.surface }]} />
      <View style={[styles.bodyLine, styles.shorter, { backgroundColor: theme.colors.surface }]} />
      <View style={[styles.bodyLine, { backgroundColor: theme.colors.surface }]} />
      <View style={styles.gap} />
      <View style={[styles.buttonShape, { backgroundColor: theme.colors.surface }]} />
      <View style={[styles.buttonShape, { backgroundColor: theme.colors.surface }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
  gap: {
    height: 24,
  },
  buttonShape: {
    height: 48,
    borderRadius: 10,
    marginBottom: 12,
  },
});
