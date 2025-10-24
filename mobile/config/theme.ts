type Theme = {
  colors: {
    primary: string;
    primaryLight: string;
    background: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    accent: string;
    accentPink: string;
    success: string;
    white: string;
    border: string;
    shadow: string;
    black: string;
  };
  spacing: {
    none: number;
    s: number;
    md: number;
    lg: number;
    xlg: number;
    xxlg: number;
  };
};

export const theme: Theme = {
  colors: {
    primary: '#3CD3AD',
    primaryLight: '#E8F8F6',
    background: '#E8E8E8',
    cardBackground: '#FFFFFF',
    textPrimary: '#2D2D2D',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accent: '#4ECDC4',
    accentPink: '#FF6B8A',
    success: '#3CD3AD',
    white: '#FFFFFF',
    border: '#F0F0F0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    black: '#000000',
  },
  spacing: {
    none: 0,
    s: 4,
    md: 8,
    lg: 16,
    xlg: 24,
    xxlg: 32,
  },
};