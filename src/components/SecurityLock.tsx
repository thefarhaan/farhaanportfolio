import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  "Nice try! This masterpiece is protected by Farhaan. ✨",
  "Viewing source? Farhaan already knew you'd try. 🕵️‍♂️",
  "Code is art. Don't steal it! — Built by Farhaan 🚀",
  "Curiosity is good, but this site is locked! 🔒",
  "Access Denied. You're in Farhaan's world now. 🌐",
  "Ship fast, protect faster. Built with love by Farhaan. ❤️",
];

const COLORS = [
  { text: 'text-cyan', border: 'border-cyan/50', dot: 'bg-cyan', shadow: 'shadow-[0_0_30px_rgba(0,229,255,0.2)]' },
  { text: 'text-amber', border: 'border-amber/50', dot: 'bg-amber', shadow: 'shadow-[0_0_30px_rgba(245,166,35,0.2)]' },
  { text: 'text-rose-400', border: 'border-rose-400/50', dot: 'bg-rose-400', shadow: 'shadow-[0_0_30px_rgba(251,113,133,0.2)]' },
  { text: 'text-violet-400', border: 'border-violet-400/50', dot: 'bg-violet-400', shadow: 'shadow-[0_0_30px_rgba(167,139,250,0.2)]' },
  { text: 'text-emerald-400', border: 'border-emerald-400/50', dot: 'bg-emerald-400', shadow: 'shadow-[0_0_30px_rgba(52,211,153,0.2)]' },
];

const SecurityLock: React.FC = () => {
  const [toast, setToast] = useState<{ show: boolean; msg: string; color: typeof COLORS[0] }>({ 
    show: false, 
    msg: "", 
    color: COLORS[0] 
  });

  const showToast = () => {
    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setToast({ show: true, msg: randomMsg, color: randomColor });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        showToast();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      showToast();
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, x: 20 }}
          className={`fixed top-10 right-6 z-[9999] px-6 py-4 bg-base/90 border ${toast.color.border} backdrop-blur-2xl rounded-2xl ${toast.color.shadow} pointer-events-none max-w-sm`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-2 h-2 mt-2 rounded-full ${toast.color.dot} animate-pulse shrink-0`} />
            <span className={`font-mono text-sm ${toast.color.text} tracking-tight leading-relaxed`}>
              {toast.msg}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecurityLock;
