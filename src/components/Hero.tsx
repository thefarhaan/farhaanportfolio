import React, { useState, useEffect } from 'react';
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
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-base pt-20">
      <ParticleCanvas />

      {/* Content */}
      <div className="z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="font-label text-[10px] md:text-xs tracking-[0.3em] text-cyan uppercase">
            Available for hire · Remote & On-site
          </span>
        </motion.div>

        <h1 
          className="font-syne font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] text-primary leading-[0.95] md:leading-[0.9] tracking-tighter mb-12 uppercase"
        >
          <div className="overflow-hidden py-1">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className="block text-glow-cyan opacity-80"
            >
              SHAIK
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              viewport={{ once: true }}
              className="block text-white"
            >
              MOHAMMED
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
              viewport={{ once: true }}
              className="block text-cyan italic"
            >
              FARHAAN
            </motion.span>
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          className="font-mono text-base md:text-xl text-muted mb-12 h-8"
        >
          <span className="text-dim mr-2">//</span>
          {displayText}
          <span className="inline-block w-[2px] h-[1.2em] bg-cyan ml-1 animate-pulse" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Magnetic>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-cyan text-base font-bold font-syne uppercase tracking-wider rounded-none hover:bg-transparent hover:text-cyan border border-cyan transition-all duration-300 interactive"
            >
              View My Work
            </button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a 
              href="/Farhaan Resume 2026 (CV).pdf"
              download="Farhaan_Resume_2026.pdf"
              className="px-10 py-4 bg-transparent text-primary font-bold font-syne uppercase tracking-wider rounded-none border border-white/20 hover:border-cyan transition-all duration-300 flex items-center justify-center interactive"
            >
              Download CV
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-10 flex flex-col items-center gap-4"
      >
        <span className="font-label text-[10px] tracking-[0.4em] text-muted uppercase vertical-text">
          Scroll
        </span>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-cyan w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </section>
  );
};

export default Hero;
