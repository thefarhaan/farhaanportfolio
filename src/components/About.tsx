import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 3, label: 'Live Platforms', suffix: '+' },
  { value: 3, label: 'Years AI Dev', suffix: '+' },
  { value: 8, label: 'Days to Build CodeLift', suffix: '' },
  { value: 4, label: 'Languages Spoken', suffix: '+' },
];

const About: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="relative py-24 md:py-44 bg-surface px-6" ref={containerRef}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Visual */}
        <div className="relative flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Animated Hexagon Border (SVG) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
              <motion.path
                d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Orbiting dots */}
              <motion.circle
                r="1.5"
                fill="#00E5FF"
                animate={{
                  offsetDistance: ["0%", "100%"]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ offsetPath: "path('M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z')" }}
              />
            </svg>

            {/* Photo Hexagon */}
            <div 
              className="absolute inset-4 bg-elevated overflow-hidden border border-cyan/20"
              style={{ clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)' }}
            >
              <img 
                src="/farhaan.webp" 
                alt="Shaik Mohammed Farhaan"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Language Badges */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {['EN', 'HI', 'UR', 'TE'].map(lang => (
                <span key={lang} className="px-2 py-1 border border-cyan/30 bg-base text-[10px] font-label text-cyan">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-8 text-center md:text-left">
          <div>
            <span className="font-label text-xs tracking-[0.4em] text-cyan uppercase mb-4 block">About Me</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              I build things that <br />
              <span className="text-cyan">actually ship.</span>
            </h2>
            <p className="text-muted font-mono leading-relaxed max-w-xl">
              Self-taught full-stack engineer from Kadapa, Andhra Pradesh. 
              I have <span className="text-white font-bold">3+ years of specialized experience in AI-augmented coding</span>, 
              mastering the intersection of human creativity and machine efficiency.
              <br /><br />
              I specialize in <span className="text-white font-bold">leveraging and orchestrating advanced AI Agents</span> and deep integration 
              of AI tools to accelerate development cycles. My latest proof of concept, 
              <span className="text-white font-bold">CodeLift</span>, was built from scratch to production in just <span className="text-white font-bold">8 days</span>.
              <br /><br />
              Execution over theory. Speed without compromising quality.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 mt-4">
            {STATS.map((stat, idx) => (
              <StatCounter key={idx} {...stat} trigger={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter: React.FC<{ value: number, label: string, suffix: string, trigger: boolean }> = ({ value, label, suffix, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    let timer: any;

    const animate = () => {
      start += end / (duration / 16);
      if (start >= end) {
        setCount(end);
      } else {
        setCount(Math.floor(start));
        timer = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(timer);
  }, [value, trigger]);

  return (
    <div className="flex flex-col">
      <span className="text-4xl md:text-5xl font-syne font-bold text-cyan mb-1">
        {count}{suffix}
      </span>
      <span className="text-xs font-mono text-muted uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

export default About;
