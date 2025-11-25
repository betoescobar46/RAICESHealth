import { ThemeColor } from '../types';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export const THEME_PALETTES: Record<ThemeColor, ThemeColors> = {
  blue: {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryDark: 'bg-blue-800',
    secondary: 'bg-blue-100',
    accent: 'text-blue-600',
    background: 'bg-blue-50',
    text: 'text-blue-900'
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    primaryDark: 'bg-purple-800',
    secondary: 'bg-purple-100',
    accent: 'text-purple-600',
    background: 'bg-purple-50',
    text: 'text-purple-900'
  },
  green: {
    primary: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    primaryDark: 'bg-green-800',
    secondary: 'bg-green-100',
    accent: 'text-green-600',
    background: 'bg-green-50',
    text: 'text-green-900'
  },
  orange: {
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryDark: 'bg-orange-800',
    secondary: 'bg-orange-100',
    accent: 'text-orange-600',
    background: 'bg-orange-50',
    text: 'text-orange-900'
  },
  red: {
    primary: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    primaryDark: 'bg-red-800',
    secondary: 'bg-red-100',
    accent: 'text-red-600',
    background: 'bg-red-50',
    text: 'text-red-900'
  },
  teal: {
    primary: 'bg-teal-600',
    primaryHover: 'hover:bg-teal-700',
    primaryDark: 'bg-teal-800',
    secondary: 'bg-teal-100',
    accent: 'text-teal-600',
    background: 'bg-teal-50',
    text: 'text-teal-900'
  }
};

export const getThemeClasses = (color: ThemeColor = 'blue'): ThemeColors => {
  return THEME_PALETTES[color] || THEME_PALETTES.blue;
};
