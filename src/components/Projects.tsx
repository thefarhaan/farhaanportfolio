import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe as Github } from 'lucide-react';
import Magnetic from './Magnetic';

const PROJECTS = [
  {
    id: 'codelift',
    title: 'CodeLift',
    tag: 'FEATURED PRODUCT',
    sub: 'AI-Augmented Virtual Workspace.',
    desc: 'Built in just 8 days. A production-ready multiplayer virtual campus with real-time sync, WebRTC integration, and AI-driven automation tools.',
    metrics: ['8 Days Build', 'AI-Augmented', 'WebRTC', 'Real-time', 'Solo Build'],
    tech: ['React 19', 'Phaser 4', 'Socket.io', 'WebRTC', 'Firebase', 'AI-Agents'],
    image: '/src/assets/codelifthero.png',
    link: 'https://codelift-learnverse.vercel.app',
    github: '#',
    featured: true,
  },
  {
    id: 'terracottic',
    title: 'Terracottic',
    tag: 'ECOMMERCE · LIVE',
    sub: 'Global handcrafted decor platform. India to world.',
    desc: 'TypeScript full-stack platform with payment gateways, shipping APIs, and real-time order tracking via Firebase.',
    tech: ['React', 'Node', 'Express', 'Firebase', 'TypeScript'],
    image: '/src/assets/terracottichero.png',
    link: 'https://terracottic.com',
    github: '#',
    featured: false,
  },
  {
    id: 'kleanone',
    title: 'KleanOne',
    tag: 'ECOMMERCE · LIVE',
    sub: 'Premium cleaning products. South India\'s trusted brand.',
    desc: 'B2B/B2C platform with invoice management, shipping integration, and product catalog systems.',
    tech: ['React', 'Node', 'Express', 'Firebase'],
    image: '/src/assets/kleanonehero.png',
    link: 'https://kleanone.in',
    github: '#',
    featured: false,
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 md:py-44 bg-base px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="font-label text-xs tracking-[0.4em] text-cyan uppercase mb-4 block">Selected Work</span>
          <h2 className="text-5xl md:text-7xl font-syne font-bold leading-tight">
            Things I've <br />
            <span className="text-cyan">shipped.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-20">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any, index: number }> = ({ project, index }) => {
  const isFeatured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative overflow-hidden bg-surface border border-cyan/10 hover:border-cyan/40 transition-all duration-500
        ${isFeatured ? 'p-8 md:p-12' : 'p-6 md:p-8 flex flex-col'}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* Content */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <span className={`font-label text-[10px] tracking-widest uppercase px-2 py-1 mb-6 inline-block border 
            ${isFeatured ? 'border-amber/40 text-amber shadow-[0_0_10px_rgba(245,166,35,0.2)]' : 'border-cyan/40 text-cyan shadow-[0_0_10px_rgba(0,229,255,0.2)]'}`}>
            {project.tag}
          </span>
          
          <h3 className="text-4xl md:text-6xl mb-4 font-syne font-bold">
            {project.title}
          </h3>
          
          <p className="text-cyan font-mono text-sm md:text-lg mb-6">{project.sub}</p>
          
          <p className="text-muted font-mono text-sm leading-relaxed mb-8 max-w-xl">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.metrics && project.metrics.map((m: string) => (
              <span key={m} className="text-[10px] font-label text-amber border border-amber/20 px-2 py-1 uppercase bg-amber/5">
                {m}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t: string) => (
              <span key={t} className="text-[10px] font-mono text-dim border border-white/5 px-2 py-1 bg-white/[0.02]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Magnetic>
              <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan font-syne font-bold uppercase tracking-wider hover:translate-x-2 transition-transform">
                Live Demo <ExternalLink size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href={project.github} className="text-muted hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-2 order-1 lg:order-2 relative group-hover:scale-[1.01] transition-transform duration-500">
          <div className="relative aspect-[4/3] lg:h-full overflow-hidden border border-white/10 group-hover:border-cyan/30 transition-all duration-500 rounded-lg bg-[#0a0a0f]">
            {/* Browser Header */}
            <div className="absolute top-0 left-0 w-full h-8 bg-[#1a1a24] border-b border-white/5 flex items-center px-4 gap-2 z-20">
               <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                 <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                 <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
               </div>
               <div className="flex-1 ml-4 h-5 bg-[#0f0f15] rounded-sm border border-white/5 opacity-50" />
            </div>

            {/* Image with top-alignment to preserve the website header */}
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-top mt-8 transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl -z-10" />
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
