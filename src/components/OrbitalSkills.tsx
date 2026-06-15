import React from 'react';
import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    label: '// Frontend',
    skills: [
      { name: 'React', slug: 'react', color: '61DAFB' },
      { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
      { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
      { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4' },
      { name: 'Framer Motion', slug: 'framer', color: '0055FF' },
    ],
  },
  {
    label: '// Backend',
    skills: [
      { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
      { name: 'Express.js', slug: 'express', color: 'FFFFFF' },
      { name: 'Firebase', slug: 'firebase', color: 'FFCA28' },
      { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
      { name: 'Supabase', slug: 'supabase', color: '3ECF8E' },
      { name: 'Python', slug: 'python', color: '3776AB' },
    ],
  },
  {
    label: '// Realtime & Infra',
    skills: [
      { name: 'Socket.io', slug: 'socketdotio', color: 'FFFFFF' },
      { name: 'WebRTC', slug: 'webrtc', color: 'FFFFFF' },
      { name: 'Docker', slug: 'docker', color: '2496ED' },
      { name: 'Git', slug: 'git', color: 'F05032' },
    ],
  },
  {
    label: '// AI & Game Dev',
    skills: [
      { name: 'OpenAI', slug: 'openai', color: '10A37F', path: '/960px-OpenAI_Logo.svg.png' },
      { name: 'AI-Agents', slug: 'anthropic', color: 'FFFFFF' },
      { name: 'Phaser', slug: 'phaser', color: '8CC63F', path: '/phaser_logo.png' },
    ],
  },
];

const OrbitalSkills: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 md:py-44 bg-surface px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <span className="font-label text-xs tracking-[0.4em] text-cyan uppercase mb-4 block">Skills Matrix</span>
          <h2 className="text-5xl md:text-7xl font-syne font-bold leading-tight">
            My Technical <br />
            <span className="text-cyan">Ecosystem.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div key={cat.label}>
              {/* Category label */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs text-dim tracking-widest">{cat.label}</span>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>
              {/* Skills row */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                {cat.skills.map((skill, index) => {
                  const globalIndex = SKILL_CATEGORIES
                    .slice(0, catIdx)
                    .reduce((acc, c) => acc + c.skills.length, 0) + index;
                  return (
                    <SkillTile key={skill.name} skill={skill} index={globalIndex} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[20vw] font-syne font-black text-white/[0.02] pointer-events-none select-none uppercase whitespace-nowrap">
        STACK
      </div>
    </section>
  );
};

type Skill = {
  name: string;
  slug: string;
  color: string;
  path?: string;
};

const SkillTile: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const dragConstraintsRef = React.useRef(null);

  return (
    <motion.div ref={dragConstraintsRef} className="relative">
      <motion.div
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.15, zIndex: 50 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.04 }}
        whileHover={{ y: -5 }}
        data-cursor="drag"
        className="flex flex-col items-center gap-2 md:gap-3 group cursor-grab active:cursor-grabbing relative"
      >
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          <div className="bg-surface border border-cyan/20 px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
            <span className="text-[10px] font-label font-bold text-cyan tracking-widest">{skill.name}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface border-b border-r border-cyan/20 rotate-45" />
          </div>
        </div>

        {/* Icon */}
        <div className="relative w-full aspect-square flex items-center justify-center bg-elevated border border-white/5 group-hover:border-cyan/30 transition-all duration-500 rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={skill.path || `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
            alt={skill.name}
            className={`${skill.path ? 'w-10 h-10 sm:w-14 sm:h-14' : 'w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11'} object-contain transition-transform duration-500 group-hover:scale-110 ${skill.name === 'OpenAI' ? 'brightness-0 invert' : ''}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!skill.path && !target.src.includes('/white')) {
                target.src = `https://cdn.simpleicons.org/${skill.slug}/white`;
              }
            }}
          />
        </div>

        {/* Name below */}
        <span className="text-[9px] md:text-[10px] font-label text-muted group-hover:text-cyan uppercase tracking-[0.15em] transition-colors duration-300 text-center leading-tight">
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default OrbitalSkills;
