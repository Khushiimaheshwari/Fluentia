import { useThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const context = useThemeContext();
  return context;
};
