import { Modal, StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTitle } from '@/components/ThemedTitle';
import { ActionButton } from '@/components/ActionButton';
import { type NpcDialog } from '@/hooks/useStorySession';

type Props = {
  dialog: NpcDialog | null;
  error: string | null;
  onClose: () => void;
};

export function NpcDialogModal({ dialog, error, onClose }: Props) {
  const { theme } = useTheme();

  if (!dialog && !error) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          {dialog ? (
            <>
              <ThemedTitle style={styles.title}>{dialog.npc.name}</ThemedTitle>
              <ThemedText style={styles.description}>
                {dialog.npc.description}
              </ThemedText>
              <ThemedText style={styles.body}>{dialog.dialog}</ThemedText>
            </>
          ) : (
            <ThemedText style={styles.body}>{error}</ThemedText>
          )}
          <ActionButton text="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 20,
  },
});
