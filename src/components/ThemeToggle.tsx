import React from 'react';
import { useTheme } from '../hooks/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-cyan/30 hover:border-cyan text-cyan hover:bg-cyan/10 transition-all focus:outline-none flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="animate-in spin-in-90" />
      ) : (
        <Moon size={18} className="animate-in spin-in-90" />
      )}
    </button>
  );
};

export default ThemeToggle;
