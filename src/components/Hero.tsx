import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import Magnetic from './Magnetic';
import { ChevronDown } from 'lucide-react';

const ROLES = [
  'Creator of CodeLift',
  'AI Specialist',
  'Prompt Engineer',
  'AI-Augmented Builder',
  'eCommerce Architect',
  'Metaverse Developer',
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-base pt-20"
    >
      <ParticleCanvas />

      {/* Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(0,229,255,0.07), transparent 70%)`,
        }}
      />

      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="z-10 text-center px-6">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
          <span className="font-label text-[10px] md:text-xs tracking-[0.3em] text-cyan uppercase">
            Available for hire · Remote &amp; On-site
          </span>
        </motion.div>

        {/* Name */}
        <h1 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] text-primary leading-[0.95] md:leading-[0.9] tracking-tighter mb-12 uppercase">
          <div className="overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="block text-glow-cyan opacity-80"
            >
              SHAIK
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
              className="block text-white"
            >
              MOHAMMED
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
              className="block text-cyan italic glitch-effect"
            >
              FARHAAN
            </motion.span>
          </div>
        </h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-mono text-base md:text-xl text-muted mb-12 h-8"
        >
          <span className="text-dim mr-2">//</span>
          {displayText}
          <span className="inline-block w-[2px] h-[1.2em] bg-cyan ml-1 animate-pulse" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-14"
        >
          <Magnetic>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-10 py-4 bg-cyan text-base font-bold font-syne uppercase tracking-wider hover:bg-transparent hover:text-cyan border border-cyan transition-all duration-300 interactive overflow-hidden group"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <span className="relative z-10">View My Work</span>
            </button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="/Farhaan Resume 2026 (CV).pdf"
              download="Farhaan_Resume_2026.pdf"
              className="px-10 py-4 bg-transparent text-primary font-bold font-syne uppercase tracking-wider border border-white/20 hover:border-cyan transition-all duration-300 flex items-center justify-center interactive"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              Download CV
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-[1px] bg-white/10" />
          <span className="font-label text-[9px] tracking-[0.5em] text-dim uppercase">Scroll</span>
          <div className="w-12 h-[1px] bg-white/10" />
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="text-cyan/50 w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
