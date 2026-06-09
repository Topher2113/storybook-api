import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type Theme, themes, defaultTheme } from '@/constants/themes';

const STORAGE_KEY = 'theme-name';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((name) => {
        if (name) {
          const saved = themes.find((t) => t.name === name);
          if (saved) setThemeState(saved);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    AsyncStorage.setItem(STORAGE_KEY, t.name).catch(() => {});
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
