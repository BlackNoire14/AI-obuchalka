import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSizeState] = useState<number>(14);

  useEffect(() => {
    const savedTheme = localStorage.getItem('codetutor.theme') as Theme;
    const savedFontSize = localStorage.getItem('codetutor.fontSize');
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    if (savedFontSize) {
      setFontSizeState(parseInt(savedFontSize, 10));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('codetutor.theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    localStorage.setItem('codetutor.fontSize', size.toString());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
