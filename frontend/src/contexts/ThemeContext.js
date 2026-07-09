import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../constants';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && THEMES.some(theme => theme.name === savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  const applyThemeToDocument = (themeName) => {
    const theme = THEMES.find(t => t.name === themeName);
    if (theme) {
      const [bgColor, primaryColor, secondaryColor, textColor] = theme.colors;
      
      document.documentElement.style.setProperty('--bg-color', bgColor);
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--secondary-color', secondaryColor);
      document.documentElement.style.setProperty('--text-color', textColor);
      
      // Update body class for theme-specific styling
      document.body.className = `theme-${themeName}`;
    }
  };

  const toggleTheme = (themeName) => {
    setCurrentTheme(themeName);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const value = {
    currentTheme,
    themes: THEMES,
    isDropdownOpen,
    toggleTheme,
    toggleDropdown,
    closeDropdown: () => setIsDropdownOpen(false)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
