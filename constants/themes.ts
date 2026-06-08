export type Theme = {
  name: string;
  dark: boolean;
  colors: {
    background: string;
    surface: string;
    primary: string;
    text: string;
    accent: string;
  };
};

export const themes: Theme[] = [
  {
    name: 'Parchment',
    dark: false,
    colors: {
      background: '#F5EDD6',
      surface: '#EDE0BE',
      primary: '#C9851A',
      text: '#2C1810',
      accent: '#8B4513',
    },
  },
  {
    name: 'Candlelight',
    dark: false,
    colors: {
      background: '#FFF8E7',
      surface: '#FFF0CC',
      primary: '#E87C1A',
      text: '#3D2200',
      accent: '#CC5500',
    },
  },
  {
    name: 'Morning Mist',
    dark: false,
    colors: {
      background: '#EEF2F7',
      surface: '#DDE6F0',
      primary: '#4A9EBF',
      text: '#1E3A52',
      accent: '#2E7A9E',
    },
  },
  {
    name: 'Midnight Tome',
    dark: true,
    colors: {
      background: '#0D1117',
      surface: '#161B22',
      primary: '#D4A843',
      text: '#E2D9C8',
      accent: '#C09030',
    },
  },
  {
    name: 'Forest Shadow',
    dark: true,
    colors: {
      background: '#0C1A0E',
      surface: '#152417',
      primary: '#6FAE5A',
      text: '#D4C9A8',
      accent: '#4A8C3A',
    },
  },
  {
    name: 'Gothic',
    dark: true,
    colors: {
      background: '#120816',
      surface: '#1E0F27',
      primary: '#9B2335',
      text: '#C9B8D8',
      accent: '#7A1B2A',
    },
  },
];

export const defaultTheme = themes[0];
