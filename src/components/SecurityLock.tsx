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

const SecurityLock: React.FC = () => {
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });

  const showToast = () => {
    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setToast({ show: true, msg: randomMsg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
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
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 bg-base/80 border border-cyan/50 backdrop-blur-xl rounded-full shadow-[0_0_30px_rgba(0,229,255,0.2)] pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="font-mono text-sm text-cyan tracking-tight">
              {toast.msg}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecurityLock;
