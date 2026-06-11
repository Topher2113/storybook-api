import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useStorySession } from '@/hooks/useStorySession';
import { SkeletonCard, SkeletonChoices } from '@/components/SkeletonLoader';
import { StoryCard } from '@/components/StoryCard';
import { ChoiceButton } from '@/components/ChoiceButton';
import { ActionButton } from '@/components/ActionButton';
import { ThemedText } from '@/components/ThemedText';
import { NpcButton } from '@/components/NpcButton';
import { NpcDialogModal } from '@/components/NpcDialogModal';

export default function StoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    scene, gameStatus, loading, error, startGame, choose, retry,
    npcDialog, npcError, talkToNpc, closeNpcDialog,
  } = useStorySession();

  useEffect(() => {
    startGame();
  }, [startGame]);

  const isEnding = gameStatus === 'completed' || scene?.type === 'ending';
  const hasChoices = (scene?.choices?.length ?? 0) > 0;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={styles.storyScroll} contentContainerStyle={styles.storyContent}>
        {loading && <SkeletonCard />}
        {error && (
          <ThemedText style={styles.message}>{error}</ThemedText>
        )}
        {!loading && !error && !scene && (
          <ThemedText style={styles.message}>
            No story found. The adventure may be unavailable right now.
          </ThemedText>
        )}
        {!loading && !error && scene && (
          <StoryCard
            title={scene.title}
            text={scene.text}
            endingName={isEnding ? scene.ending_name : undefined}
          />
        )}
        {!loading && !error && scene && scene.npcsPresent && scene.npcsPresent.length > 0 && (
          <View style={styles.npcSection}>
            {scene.npcsPresent.map((npc) => (
              <NpcButton key={npc.id} name={npc.name} onPress={() => talkToNpc(npc.id)} />
            ))}
          </View>
        )}
        {!loading && !error && scene && !hasChoices && !isEnding && (
          <ThemedText style={[styles.message, { color: theme.colors.accent }]}>
            No paths forward were found.
          </ThemedText>
        )}
      </ScrollView>

      <View style={styles.choicesPanel}>
        {loading && <SkeletonChoices />}
        {error && <ActionButton text="Try Again" onPress={retry} />}
        {!loading && !error && scene && (isEnding || !hasChoices) && (
          <ActionButton text="Play Again" onPress={() => router.replace('/')} />
        )}
        {!loading && !error && scene && !isEnding && hasChoices && scene.choices!.map((choice) => (
          <ChoiceButton
            key={choice.target}
            text={choice.text}
            onPress={() => choose(choice.target)}
          />
        ))}
      </View>

      <NpcDialogModal dialog={npcDialog} error={npcError} onClose={closeNpcDialog} />
    </SafeAreaView>
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
    paddingTop: 24,
  },
  choicesPanel: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  npcSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 24,
    textAlign: 'center',
  },
});
