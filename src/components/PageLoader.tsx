import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_LINES = [
  { text: '> initializing portfolio_v3.0...', delay: 0, color: 'text-muted' },
  { text: '> loading modules: gsap, framer-motion, three...', delay: 600, color: 'text-muted' },
  { text: '> connecting to terracottic.com...', delay: 1200, color: 'text-muted' },
  { text: '> STATUS: all systems operational', delay: 1800, color: 'text-cyan' },
  { text: '> Welcome, recruiter.', delay: 2400, color: 'text-amber' },
];

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers = LOADING_LINES.map((line, index) => {
      return setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] bg-base flex flex-col items-start justify-center p-8 md:p-24 font-mono overflow-hidden"
    >
      <div className="max-w-2xl w-full">
        {LOADING_LINES.map((line, index) => (
          <div key={index} className="h-8 overflow-hidden">
            <AnimatePresence>
              {visibleLines > index && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`${line.color} text-sm md:text-base mb-2`}
                >
                  <TypewriterText text={line.text} />
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </motion.div>
  );
};

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentText = '';
    const interval = setInterval(() => {
      if (currentText.length < text.length) {
        currentText = text.slice(0, currentText.length + 1);
        setDisplayText(currentText);
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default PageLoader;
