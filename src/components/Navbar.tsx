import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Menu, X } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'skills', label: 'Skills', num: '03' },
  { id: 'projects', label: 'Work', num: '04' },
  { id: 'certificates', label: 'Credentials', num: '05' },
  { id: 'experience', label: 'Journey', num: '06' },
  { id: 'contact', label: 'Contact', num: '07' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <>
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

        {/* Desktop Nav Dots */}
        <div className="hidden md:flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.id} className="group relative flex items-center">
              <span className="absolute right-full mr-4 px-2 py-1 bg-surface border border-cyan/20 text-cyan text-[10px] font-label uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
              <button
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'w-2 h-2 rounded-full border transition-all duration-300 interactive',
                  activeSection === item.id
                    ? 'bg-cyan border-cyan scale-125'
                    : 'bg-transparent border-dim group-hover:border-cyan'
                )}
                aria-label={item.label}
              />
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-cyan interactive p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-[2px] bg-cyan/10 w-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan via-purple to-cyan"
            style={{ scaleX: useScrollProgress(), originX: 0 }}
          />
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-base/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-2"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'flex items-center gap-4 py-4 px-6 w-full max-w-xs text-left group transition-all',
                  activeSection === item.id ? 'text-cyan' : 'text-muted hover:text-white'
                )}
              >
                <span className="font-syne text-4xl font-bold tracking-tighter">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement, b = document.body, st = 'scrollTop', sh = 'scrollHeight';
      const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
      setProgress(percent);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
};

export default Navbar;
