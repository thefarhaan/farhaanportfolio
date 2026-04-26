import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import OrbitalSkills from './components/OrbitalSkills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);

  // Konami Code: up, up, down, down, left, right, left, right, b, a
  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === konami[index]) {
        index++;
        if (index === konami.length) {
          setShowTerminal(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className="bg-base min-h-screen text-primary selection:bg-cyan/30 selection:text-white">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <main key="content" className="relative">
            <Navbar />
            <Hero />
            <About />
            <OrbitalSkills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />

            {/* Konami Easter Egg Terminal Overlay */}
            <AnimatePresence>
              {showTerminal && (
                <div 
                  className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-6 backdrop-blur-md"
                  onClick={() => setShowTerminal(false)}
                >
                  <div 
                    className="max-w-xl w-full bg-base border border-cyan/50 p-8 font-mono text-cyan shadow-[0_0_50px_rgba(0,229,255,0.2)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-6 border-b border-cyan/20 pb-2">
                      <span className="text-xs uppercase tracking-widest text-muted">Secret_File.exe — Terminal</span>
                      <button onClick={() => setShowTerminal(false)} className="text-cyan hover:text-white transition-colors">✕</button>
                    </div>
                    <div className="flex flex-col gap-2 text-sm md:text-base">
                      <p className="text-green-400 font-bold tracking-widest mb-4 animate-pulse">{'>'} ACCESS GRANTED</p>
                      <p><span className="text-dim">NAME:</span> Shaik Mohammed Farhaan</p>
                      <p><span className="text-dim">LOC:</span> Kadapa, Andhra Pradesh</p>
                      <p><span className="text-dim">STATUS:</span> Dangerously caffeinated</p>
                      <p><span className="text-dim">SKILL:</span> Builds metaverses in 8 days</p>
                      <p><span className="text-dim">WEAKNESS:</span> Debugging at 3am</p>
                      <p className="mt-4 border-t border-cyan/10 pt-4 italic">"Ship fast. Break nothing. Learn everything."</p>
                    </div>
                    <button 
                      onClick={() => setShowTerminal(false)}
                      className="mt-8 w-full py-2 border border-cyan/30 hover:border-cyan hover:bg-cyan/10 transition-all text-xs uppercase tracking-widest"
                    >
                      [ Close Terminal ]
                    </button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
