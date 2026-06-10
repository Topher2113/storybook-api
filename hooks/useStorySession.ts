import { useState, useCallback, useMemo } from 'react';
import { fetch } from 'expo/fetch';

const BASE = 'https://two026-summer-repo.onrender.com';

export type Choice = { text: string; target: string };
export type NpcRef = { id: string; name: string };

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
};

export function useStorySession(): StorySession {
  const [currentSceneId, setCurrentSceneId] = useState<string | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameStatus = useMemo<GameStatus>(() => {
    if (!scene) return 'idle';
    if (scene.type === 'ending') return 'completed';
    return 'in_progress';
  }, [scene]);

  const startGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    setScene(null);
    setCurrentSceneId(null);
    try {
      const listRes = await fetch(`${BASE}/api/scenes`);
      if (!listRes.ok) throw new Error(`Server error: ${listRes.status}`);
      const { startNode } = await listRes.json() as { startNode: string };
      const sceneRes = await fetch(`${BASE}/api/scenes/${startNode}`);
      if (!sceneRes.ok) throw new Error(`Server error: ${sceneRes.status}`);
      const data = await sceneRes.json() as Scene;
      setCurrentSceneId(startNode);
      setScene(data);
    } catch {
      setError('Could not start the adventure. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const choose = useCallback(async (target: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/scenes/${target}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json() as Scene;
      setCurrentSceneId(target);
      setScene(data);
    } catch {
      setError('Could not load the next scene. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(async () => {
    if (!currentSceneId) {
      await startGame();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/scenes/${currentSceneId}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json() as Scene;
      setScene(data);
    } catch {
      setError('Could not reload the scene. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentSceneId, startGame]);

  return { scene, gameStatus, loading, error, startGame, choose, retry };
}
