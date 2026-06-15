import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Magnetic from './Magnetic';

const SOCIALS = [
  { icon: <FaGithub size={18} />, url: 'https://github.com/thefarhaan', label: 'GitHub' },
  { icon: <FaLinkedin size={18} />, url: 'https://www.linkedin.com/in/shaikmohammedfarhaan/', label: 'LinkedIn' },
  { icon: <FaInstagram size={18} />, url: 'https://instagram.com/farhaan__f', label: 'Instagram' },
  { icon: <FaEnvelope size={18} />, url: 'mailto:farhaanthegenius@gmail.com', label: 'Email' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050508] relative overflow-hidden">
      {/* Gradient fade from section above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-base to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center text-center">

        {/* Big quote */}
        <p className="font-syne font-black text-3xl sm:text-5xl md:text-6xl text-white/20 leading-tight mb-16 select-none tracking-tighter">
          "Architecting Tomorrow.<br />Engineering Excellence.<br />
          <span className="text-cyan/40">Defining What's Next."</span>
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent mb-12" />

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-16">
          {SOCIALS.map((s, i) => (
            <Magnetic key={s.label} strength={0.2}>
              <motion.a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20 
                }}
                whileHover={{ y: -8, scale: 1.1 }}
                className="relative group w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl transition-all duration-500 hover:border-cyan/50 hover:bg-cyan/5 interactive"
              >
                {/* Individual icon glow */}
                <div className="absolute inset-0 bg-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-base border border-cyan/30 text-cyan font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  {s.label}
                </div>

                <div className="text-muted group-hover:text-cyan transition-colors duration-500 z-10">
                  {s.icon}
                </div>
              </motion.a>
            </Magnetic>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 border-t border-white/5 pt-8">
          <div className="font-syne font-extrabold text-xl text-cyan select-none">SMF</div>
          <div className="font-mono text-[10px] text-dim uppercase tracking-widest text-center">
            Built with precision by Farhaan · 2026
          </div>
          <div className="flex items-center gap-3 border border-white/5 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-label text-[10px] text-muted uppercase tracking-widest">Available for hire</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
