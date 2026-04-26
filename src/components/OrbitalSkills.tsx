import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
  { name: 'Express.js', slug: 'express', color: 'FFFFFF' },
  { name: 'Firebase', slug: 'firebase', color: 'FFCA28' },
  { name: 'Phaser', slug: 'phaser', color: '8CC63F', path: '/phaser_logo.png' },
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Framer Motion', slug: 'framer', color: '0055FF' },
  { name: 'OpenAI', slug: 'openai', color: '10A37F', path: '/960px-OpenAI_Logo.svg.png' },
  { name: 'AI-Agents', slug: 'anthropic', color: 'FFFFFF' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'Docker', slug: 'docker', color: '2496ED' },
  { name: 'Socket.io', slug: 'socketdotio', color: 'FFFFFF' },
  { name: 'WebRTC', slug: 'webrtc', color: 'FFFFFF' },
  { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
  { name: 'Python', slug: 'python', color: '3776AB' },
  { name: 'Supabase', slug: 'supabase', color: '3ECF8E' },
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

        {/* The Technical Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-10">
          {SKILLS.map((skill, index) => (
            <SkillTile
              key={skill.name}
              skill={skill}
              index={index}
            />
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

const SkillTile: React.FC<{
  skill: typeof SKILLS[0],
  index: number
}> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center gap-2 md:gap-4 group"
    >
      {/* Icon Container */}
      <div className="relative w-full aspect-square flex items-center justify-center bg-elevated border border-white/5 group-hover:border-cyan/30 transition-all duration-500 rounded-xl md:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-cyan/5">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <img
          src={skill.path || `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
          alt={skill.name}
          className={`${skill.path ? 'w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24' : 'w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14'} object-contain transition-transform duration-500 group-hover:scale-110 ${skill.name === 'OpenAI' ? 'brightness-0 invert' : ''}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!skill.path && !target.src.includes('/white')) {
              target.src = `https://cdn.simpleicons.org/${skill.slug}/white`;
            }
          }}
        />

        {/* Corner Index */}
        <span className="absolute top-3 left-3 text-[8px] font-mono text-dim opacity-50">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
      </div>

      {/* Name Label - Always Below */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] md:text-xs font-label font-bold text-muted group-hover:text-cyan uppercase tracking-[0.2em] transition-colors duration-300">
          {skill.name}
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          className="h-[1px] w-full bg-cyan/50 mt-1 origin-left"
        />
      </div>
    </motion.div>
  );
};

export default OrbitalSkills;
