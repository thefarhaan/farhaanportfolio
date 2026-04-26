import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const EXPERIENCES = [
  {
    date: '2025 — PRESENT',
    role: 'Full-Stack Developer',
    company: 'Terracottic & KleanOne',
    points: [
      'Built two production eCommerce platforms from scratch',
      'Designed RESTful APIs for orders, invoices, admin',
      'Firebase real-time architecture with Auth + Firestore',
      'Integrated payment gateways and shipping partner APIs'
    ],
    side: 'right',
    color: 'amber'
  },
  {
    date: '2026 — 8 DAYS',
    role: 'Solo Developer',
    company: 'LearnVerse / CodeLift',
    points: [
      'Architected full multiplayer 2D metaverse in 8 days',
      'Phaser 4 + PixiJS hybrid game engine rendering',
      'WebRTC voice/video via Simple-peer',
      'Socket.io real-time sync, Monaco Editor integration'
    ],
    side: 'left',
    color: 'cyan'
  },
  {
    date: '2025 — PRESENT',
    role: 'Mentor & Support Executive',
    company: 'TuteDude',
    points: [
      'Guided 300+ students through cybersecurity and coding',
      'Taught ethical hacking, network security, pen testing basics',
      'Resolved technical queries across student cohorts',
      'Secure development workflow instruction'
    ],
    side: 'right',
    color: 'amber'
  }
];

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-44 bg-surface px-6 relative overflow-hidden">
      {/* Cinematic Particle Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, "-20%", "120%"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-cyan rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-label text-xs tracking-[0.4em] text-amber uppercase mb-4 block"
          >
            Evolutionary Path
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-syne font-bold tracking-tighter"
          >
            My Tech <br />
            <span className="text-amber italic">Odyssey.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Progress Timeline Line with Glow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" />
          <motion.div 
            style={{ scaleY }}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber via-cyan to-amber -translate-x-1/2 hidden md:block origin-top z-10 shadow-[0_0_15px_rgba(0,229,255,0.3)]" 
          />

          <div className="flex flex-col gap-24 md:gap-40">
            {EXPERIENCES.map((exp, idx) => (
              <ExperienceItem key={idx} exp={exp} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Decorative Year - Enhanced Parallax */}
      <motion.div 
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [100, -300]),
          rotate: useTransform(scrollYProgress, [0, 1], [-5, 5])
        }}
        className="absolute right-[-10%] top-1/4 text-[35vw] font-black text-white/[0.015] pointer-events-none select-none -z-10 leading-none"
      >
        JOURNEY
      </motion.div>
    </section>
  );
};

const ExperienceItem: React.FC<{ exp: any }> = ({ exp }) => {
  const isLeft = exp.side === 'left';
  const accentColor = exp.color === 'cyan' ? 'text-cyan border-cyan/40' : 'text-amber border-amber/40';
  const dotColor = exp.color === 'cyan' ? 'bg-cyan' : 'bg-amber';

  return (
    <div className={`relative flex flex-col md:flex-row items-center w-full last:mb-0 
      ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Spacer for desktop */}
      <div className="hidden md:block w-1/2" />
      
      {/* Timeline Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
         <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`w-6 h-6 rotate-45 ${dotColor} border-[6px] border-base shadow-2xl`} 
         />
         <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full ${dotColor} -z-10`} 
         />
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? 100 : -100, rotateY: isLeft ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className={`w-full md:w-1/2 ${isLeft ? 'md:pr-24 md:text-right' : 'md:pl-24'} text-left pt-16 md:pt-0 group relative`}
      >
        <div className="relative p-8 rounded-3xl bg-elevated/20 border border-white/5 backdrop-blur-md overflow-hidden group-hover:border-white/10 transition-colors">
          {/* Holographic Shine Effect */}
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12 pointer-events-none"
          />

          <span className={`font-label text-[10px] tracking-widest ${accentColor} border px-3 py-1 mb-6 inline-block bg-base/50`}>
            {exp.date}
          </span>
          <h3 className="text-3xl md:text-5xl font-syne font-bold mb-2 tracking-tighter group-hover:text-white transition-colors">
            {exp.role}
          </h3>
          <p className={`text-lg md:text-xl font-mono mb-8 ${exp.color === 'cyan' ? 'text-cyan' : 'text-amber'} opacity-80 uppercase tracking-widest`}>
            {exp.company}
          </p>
          
          <ul className={`flex flex-col gap-4 font-mono text-sm text-muted/70 ${isLeft ? 'md:items-end' : 'items-start'}`}>
            {exp.points.map((point: string, i: number) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
                className="flex items-start gap-3 group/li"
              >
                {!isLeft && <span className="text-cyan mt-1 group-hover/li:translate-x-1 transition-transform">→</span>}
                <span className="group-hover/li:text-white transition-colors">{point}</span>
                {isLeft && <span className="text-cyan mt-1 group-hover/li:-translate-x-1 transition-transform">←</span>}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;
