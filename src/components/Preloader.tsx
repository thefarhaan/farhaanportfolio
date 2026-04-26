import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  "Hello", // English
  "Namaste", // Hindi
  "Vanakkam", // Tamil
  "Ciao", // Italian
  "Hola", // Spanish
  "Salut", // French
  "Salaam", // Arabic
  "Kon'nichiwa", // Japanese
  "I'm Farhaan" // Final name part
];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (index === WORDS.length - 1) {
      setTimeout(() => {
        onComplete();
      }, 1000);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 200);

    return () => clearInterval(interval);
  }, [index, onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Progress Circle/Line (Minimal) */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 font-mono text-[10vw] opacity-5 select-none pointer-events-none">
          {progress}%
        </div>

        <AnimatePresence mode="wait">
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="text-4xl md:text-6xl font-syne font-bold tracking-tight"
          >
            <span className="text-cyan mr-4">●</span>
            {WORDS[index]}
          </motion.h2>
        </AnimatePresence>
        
        <div className="mt-12 w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-0 bg-cyan shadow-[0_0_10px_#00e5ff]"
            />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
