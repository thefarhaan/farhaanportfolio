import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between',
        scrolled ? 'glass py-3 border-b border-cyan/10' : 'bg-transparent'
      )}
    >
      {/* Monogram */}
      <div 
        className="font-syne font-extrabold text-2xl text-cyan cursor-pointer select-none interactive"
        onClick={() => scrollTo('hero')}
      >
        SMF
      </div>

      {/* Nav Dots */}
      <div className="flex items-center gap-2 md:gap-4">
        {NAV_ITEMS.map((item) => (
          <div key={item.id} className="group relative flex items-center">
            {/* Tooltip - Hidden on mobile */}
            <span className="absolute right-full mr-4 px-2 py-1 bg-surface border border-cyan/20 text-cyan text-[10px] font-label uppercase tracking-widest opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
              {item.label}
            </span>
            
            <button
              onClick={() => scrollTo(item.id)}
              className={cn(
                'w-3 h-3 md:w-2 md:h-2 rounded-full border transition-all duration-300 interactive',
                activeSection === item.id 
                  ? 'bg-cyan border-cyan scale-125' 
                  : 'bg-transparent border-dim group-hover:border-cyan'
              )}
              aria-label={item.label}
            />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-[2px] bg-cyan/30 w-full overflow-hidden">
        <motion.div 
          className="h-full bg-cyan"
          style={{ scaleX: useScrollProgress() }}
          initial={{ originX: 0 }}
        />
      </div>
    </nav>
  );
};

// Simple scroll progress hook logic integrated here for simplicity or separate if complex
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
      const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
      setProgress(percent);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
};

export default Navbar;
