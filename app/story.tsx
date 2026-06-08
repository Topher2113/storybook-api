import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useStorySession } from '@/hooks/useStorySession';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { StoryCard } from '@/components/StoryCard';
import { ChoiceButton } from '@/components/ChoiceButton';

export default function StoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { scene, gameStatus, loading, error, startGame, choose, retry } = useStorySession();

  useEffect(() => {
    startGame();
  }, [startGame]);

  function renderContent() {
    if (loading) {
      return <SkeletonLoader />;
    }

    if (error) {
      return (
        <>
          <Text style={[styles.message, { color: theme.colors.text }]}>{error}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: theme.colors.primary, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={retry}
          >
            <Text style={[styles.actionLabel, { color: theme.colors.background }]}>Try Again</Text>
          </Pressable>
        </>
      );
    }

    if (!scene) {
      return (
        <Text style={[styles.message, { color: theme.colors.text }]}>
          No story found. The adventure may be unavailable right now.
        </Text>
      );
    }

    const hasChoices = scene.choices && scene.choices.length > 0;
    const isEnding = gameStatus === 'completed' || scene.type === 'ending';

    if (!hasChoices && !isEnding) {
      return (
        <>
          <StoryCard title={scene.title} text={scene.text} />
          <Text style={[styles.message, { color: theme.colors.accent }]}>
            No paths forward were found.
          </Text>
        </>
      );
    }

    return (
      <>
        <StoryCard
          title={scene.title}
          text={scene.text}
          endingName={isEnding ? scene.ending_name : undefined}
        />
        {isEnding ? (
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: theme.colors.primary, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => router.replace('/')}
          >
            <Text style={[styles.actionLabel, { color: theme.colors.background }]}>
              Play Again
            </Text>
          </Pressable>
        ) : (
          scene.choices!.map((choice) => (
            <ChoiceButton
              key={choice.target}
              text={choice.text}
              onPress={() => choose(choice.target)}
            />
          ))
        )}
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Adventure',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerBackTitle: 'Home',
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {renderContent()}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  actionLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
});
