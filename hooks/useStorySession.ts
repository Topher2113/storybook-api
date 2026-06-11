import { useState, useCallback, useMemo } from 'react';
import { fetch } from 'expo/fetch';

const BASE = 'https://two026-summer-repo.onrender.com';

export type Choice = { text: string; target: string };
export type NpcRef = { id: string; name: string };
export type NpcDialog = { npc: { id: string; name: string; description: string }; dialog: string };

export type Scene = {
  id: string;
  title: string;
  text: string;
  choices?: Choice[];
  type?: 'scene' | 'ending';
  ending_name?: string;
  npcsPresent?: NpcRef[];
};

type GameStatus = 'idle' | 'in_progress' | 'completed';

type StorySession = {
  scene: Scene | null;
  gameStatus: GameStatus;
  loading: boolean;
  error: string | null;
  startGame: () => Promise<void>;
  choose: (target: string) => Promise<void>;
  retry: () => Promise<void>;
  npcDialog: NpcDialog | null;
  npcLoading: boolean;
  npcError: string | null;
  talkToNpc: (npcId: string) => Promise<void>;
  closeNpcDialog: () => void;
};

export function useStorySession(): StorySession {
  const [currentSceneId, setCurrentSceneId] = useState<string | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [npcDialog, setNpcDialog] = useState<NpcDialog | null>(null);
  const [npcLoading, setNpcLoading] = useState(false);
  const [npcError, setNpcError] = useState<string | null>(null);

  const gameStatus = useMemo<GameStatus>(() => {
    if (!scene) return 'idle';
    if (scene.type === 'ending') return 'completed';
    return 'in_progress';
  }, [scene]);

  async function withLoading(action: () => Promise<void>, errorMsg: string) {
    setLoading(true);
    setError(null);
    try {
      await action();
    } catch {
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const startGame = useCallback(() => withLoading(async () => {
    setScene(null);
    setCurrentSceneId(null);
    setNpcDialog(null);
    setNpcError(null);
    const listRes = await fetch(`${BASE}/api/scenes`);
    if (!listRes.ok) throw new Error(`Server error: ${listRes.status}`);
    const { startNode } = await listRes.json() as { startNode: string };
    const sceneRes = await fetch(`${BASE}/api/scenes/${startNode}`);
    if (!sceneRes.ok) throw new Error(`Server error: ${sceneRes.status}`);
    const data = await sceneRes.json() as Scene;
    setCurrentSceneId(startNode);
    setScene(data);
  }, 'Could not start the adventure. Check your connection and try again.'), []);

  const choose = useCallback((target: string) => withLoading(async () => {
    setNpcDialog(null);
    setNpcError(null);
    const res = await fetch(`${BASE}/api/scenes/${target}`);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json() as Scene;
    setCurrentSceneId(target);
    setScene(data);
  }, 'Could not load the next scene. Please try again.'), []);

  const retry = useCallback(() => {
    if (!currentSceneId) return startGame();
    return withLoading(async () => {
      const res = await fetch(`${BASE}/api/scenes/${currentSceneId}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json() as Scene;
      setScene(data);
    }, 'Could not reload the scene. Please try again.');
  }, [currentSceneId, startGame]);

  const talkToNpc = useCallback(async (npcId: string) => {
    if (!currentSceneId) return;
    setNpcLoading(true);
    setNpcError(null);
    try {
      const res = await fetch(`${BASE}/api/scenes/${currentSceneId}/npcs/${npcId}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setNpcDialog(await res.json() as NpcDialog);
    } catch {
      setNpcError('Could not reach this character. Please try again.');
    } finally {
      setNpcLoading(false);
    }
  }, [currentSceneId]);

  const closeNpcDialog = useCallback(() => {
    setNpcDialog(null);
    setNpcError(null);
  }, []);

  return {
    scene, gameStatus, loading, error, startGame, choose, retry,
    npcDialog, npcLoading, npcError, talkToNpc, closeNpcDialog,
  };
}
