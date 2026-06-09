import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useStorySession } from '@/hooks/useStorySession';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { StoryCard } from '@/components/StoryCard';
import { ChoiceButton } from '@/components/ChoiceButton';
import { ThemedText } from '@/components/ThemedText';

export default function StoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { scene, gameStatus, loading, error, startGame, choose, retry } = useStorySession();

  useEffect(() => {
    startGame();
  }, [startGame]);

  function renderStory() {
    if (loading) {
      return <SkeletonLoader />;
    }

    if (error) {
      return (
        <ThemedText style={styles.message}>{error}</ThemedText>
      );
    }

    if (!scene) {
      return (
        <ThemedText style={styles.message}>
          No story found. The adventure may be unavailable right now.
        </ThemedText>
      );
    }

    const isEnding = gameStatus === 'completed' || scene.type === 'ending';
    const hasChoices = scene.choices && scene.choices.length > 0;

    if (!hasChoices && !isEnding) {
      return (
        <>
          <StoryCard title={scene.title} text={scene.text} />
          <ThemedText style={[styles.message, { color: theme.colors.accent }]}>
            No paths forward were found.
          </ThemedText>
        </>
      );
    }

    return (
      <StoryCard
        title={scene.title}
        text={scene.text}
        endingName={isEnding ? scene.ending_name : undefined}
      />
    );
  }

  function renderChoices() {
    if (loading || error || !scene) {
      if (error) {
        return (
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: theme.colors.primary, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={retry}
          >
            <ThemedText style={[styles.actionLabel, { color: theme.colors.background }]}>
              Try Again
            </ThemedText>
          </Pressable>
        );
      }
      return null;
    }

    const isEnding = gameStatus === 'completed' || scene.type === 'ending';
    const hasChoices = scene.choices && scene.choices.length > 0;

    if (isEnding || !hasChoices) {
      return (
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: theme.colors.primary, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => router.replace('/')}
        >
          <ThemedText style={[styles.actionLabel, { color: theme.colors.background }]}>
            Play Again
          </ThemedText>
        </Pressable>
      );
    }

    return (
      <>
        {scene.choices!.map((choice) => (
          <ChoiceButton
            key={choice.target}
            text={choice.text}
            onPress={() => choose(choice.target)}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ScrollView style={styles.storyScroll} contentContainerStyle={styles.storyContent}>
          {renderStory()}
        </ScrollView>
        <View style={styles.choicesPanel}>
          {renderChoices()}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyScroll: {
    flex: 1,
  },
  storyContent: {
    padding: 20,
    paddingTop: 40,
  },
  choicesPanel: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  message: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 24,
    textAlign: 'center',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 19,
  },
});
