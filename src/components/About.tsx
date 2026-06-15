import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';

const STATS = [
  { value: 3, label: 'Live Platforms', suffix: '+', icon: null },
  { value: 3, label: 'Years AI Dev', suffix: '+', icon: null },
  { value: 8, label: 'Days to Build CodeLift', suffix: '', icon: null },
  { value: 4, label: 'Languages Spoken', suffix: '+', icon: null },
];

const TICKER_ITEMS = [
  'AI-AUGMENTED DEVELOPER',
  'FULL-STACK ENGINEER',
  'METAVERSE ARCHITECT',
  'PROMPT ENGINEER',
  'KADAPA, ANDHRA PRADESH',
  'AVAILABLE FOR HIRE',
  'AI SPECIALIST',
  'ECOMMERCE BUILDER',
];

const About: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" className="relative py-24 md:py-44 bg-surface px-6 overflow-hidden" ref={containerRef}>

      {/* Marquee Ticker */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-white/5 py-3 bg-base/60 backdrop-blur-sm">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-label text-[10px] tracking-[0.4em] text-dim uppercase flex items-center gap-12">
              {item}
              <span className="text-cyan/40 mx-0">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10">

        {/* Left: Visual */}
        <div className="relative flex justify-center">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80"
            style={{ y: yParallax }}
          >
            {/* Animated Hexagon Border */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
              <motion.path
                d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                fill="none"
                stroke="var(--color-cyan)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.circle
                r="1.5"
                fill="var(--color-cyan)"
                animate={{ offsetDistance: ['0%', '100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ offsetPath: "path('M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z')" }}
              />
            </svg>

            {/* Photo Hexagon */}
            <div
              className="absolute inset-4 bg-elevated overflow-hidden border border-cyan/20 group"
              style={{ clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)' }}
            >
              <img
                src="/farhaan.webp"
                alt="Shaik Mohammed Farhaan"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>

            {/* Language Badges */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {['EN', 'HI', 'UR', 'TE'].map(lang => (
                <Magnetic key={lang} strength={0.4}>
                  <div className="px-3 py-1.5 border border-cyan/30 bg-base/80 backdrop-blur-md text-[10px] font-label text-cyan cursor-pointer hover:bg-cyan/10 transition-colors">
                    {lang}
                  </div>
                </Magnetic>
              ))}
            </div>
          </motion.div>
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
              of AI tools to accelerate development cycles. My latest proof of concept,&nbsp;
              <span className="text-white font-bold">CodeLift</span>, was built from scratch to production in just <span className="text-white font-bold">8 days</span>.
              <br /><br />
              Execution over theory. Speed without compromising quality.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            {STATS.map((stat, idx) => (
              <StatCounter key={idx} {...stat} trigger={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCounter: React.FC<{ value: number; label: string; suffix: string; trigger: boolean }> = ({
  value, label, suffix, trigger,
}) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!trigger) return;
    
    let currentIteration = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      if (currentIteration >= maxIterations) {
        setDisplayValue(value.toString());
        clearInterval(interval);
      } else {
        // Generate a random number string of similar length
        const randomVal = Math.floor(Math.random() * Math.pow(10, value.toString().length)).toString();
        setDisplayValue(randomVal);
        currentIteration++;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [value, trigger]);

  return (
    <div className="flex flex-col gap-1 p-4 border border-white/5 hover:border-cyan/20 transition-colors duration-300 bg-elevated/20">
      <span className="text-4xl md:text-5xl font-syne font-bold text-cyan">
        {displayValue}{suffix}
      </span>
      <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{label}</span>
    </div>
  );
};

export default About;
