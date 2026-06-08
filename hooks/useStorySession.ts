import { useState, useCallback } from 'react';
import { fetch } from 'expo/fetch';

const BASE = 'https://two026-summer-repo.onrender.com';

export type Choice = { text: string; target: string };

export type Scene = {
  id: string;
  title: string;
  text: string;
  choices?: Choice[];
  type?: 'scene' | 'ending';
  ending_name?: string;
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
  const [gameId, setGameId] = useState<string | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    setScene(null);
    setGameStatus('idle');
    try {
      const res = await fetch(`${BASE}/api/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: 'rat-adventure' }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json() as { gameId: string; status: GameStatus; scene: Scene };
      setGameId(data.gameId);
      setScene(data.scene);
      setGameStatus(data.status);
    } catch {
      setError('Could not start the adventure. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const choose = useCallback(async (target: string) => {
    if (!gameId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/games/${gameId}/choose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json() as { gameId: string; status: GameStatus; scene: Scene };
      setScene(data.scene);
      setGameStatus(data.status);
    } catch {
      setError('Could not load the next scene. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  const retry = useCallback(async () => {
    if (!gameId) {
      await startGame();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/games/${gameId}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json() as { gameId: string; status: GameStatus; scene: Scene };
      setScene(data.scene);
      setGameStatus(data.status);
    } catch {
      setError('Could not reload the scene. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [gameId, startGame]);

  return { scene, gameStatus, loading, error, startGame, choose, retry };
}
