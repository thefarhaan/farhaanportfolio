import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Eye 
} from 'lucide-react';

interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  category: string;
  image: string;
  date?: string;
}

const CATEGORIES = [
  'All',
  'AI & Data Science',
  'Programming',
  'Cybersecurity',
  'Development',
  'Others'
];

const CERTIFICATES: CertificateData[] = [
  {
    id: 'llm-genai',
    title: 'Large Language Models (LLMs) & GenAI',
    issuer: 'TuteDude',
    category: 'AI & Data Science',
    image: '/src/assets/Certificates/certificate_TD-SHAI-LLM-1633.webp',
    date: '2026'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Specialization',
    issuer: 'TuteDude',
    category: 'AI & Data Science',
    image: '/src/assets/Certificates/certificate_TD-SHAI-DL-1633.webp',
    date: '2025'
  },
  {
    id: 'machine-learning-core',
    title: 'Machine Learning Core',
    issuer: 'TuteDude',
    category: 'AI & Data Science',
    image: '/src/assets/Certificates/certificate_TD-_-ML-1634.webp',
    date: '2025'
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    issuer: 'TuteDude',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/certificate_TD-SHAI-EH-2015.webp',
    date: '2025'
  },
  {
    id: 'mern-fullstack',
    title: 'MERN Full-Stack Development',
    issuer: 'TuteDude',
    category: 'Development',
    image: '/src/assets/Certificates/certificate_TD-SHAI-ME-0912.webp',
    date: '2025'
  },
  {
    id: 'python-core',
    title: 'Python Core Programming',
    issuer: 'TuteDude',
    category: 'Programming',
    image: '/src/assets/Certificates/certificate_TD-SHAI-PY-0002 (1).webp',
    date: '2025'
  },
  {
    id: 'ultimate-datascience',
    title: 'The Ultimate Job-Ready Data Science Course',
    issuer: 'CodeWithHarry',
    category: 'AI & Data Science',
    image: '/src/assets/Certificates/The_Ultimate_Job_Ready_Data_Science_Course_Certificate.webp',
    date: '2025'
  },
  {
    id: 'python-advanced-2025',
    title: 'Python Advanced Certificate 2025',
    issuer: 'CodeWithHarry',
    category: 'Programming',
    image: '/src/assets/Certificates/Shaik Mohammed Farhaan (Python Certificate 2025).webp',
    date: '2025'
  },
  {
    id: 'cybersec-ops-foundation',
    title: 'Cyber Security Operations Foundation',
    issuer: 'Open Source Connect Global',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/_Shaik Mohammed Farhaan__Certificate_1.webp',
    date: '2025'
  },
  {
    id: 'cyber-defense-attack',
    title: 'Cyber Defense & Attack Vectors',
    issuer: 'Open Source Connect Global',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/_Shaik Mohammed Farhaan__Certificate_2.webp',
    date: '2025'
  },
  {
    id: 'pen-testing-specialist',
    title: 'Penetration Testing Specialist',
    issuer: 'Open Source Connect Global',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/_Shaik Mohammed Farhaan__Certificate_3.webp',
    date: '2025'
  },
  {
    id: 'gen-ai',
    title: 'Generative Ai',
    issuer: 'TuteDude',
    category: 'AI & Data Science',
    image: '/src/assets/Certificates/certificate_TD-SHAI-GA-1631.webp',
    date: '2025'
  },
  {
    id: 'java-full-stack',
    title: 'Java Full Stack Engineering',
    issuer: 'Edu Bridge',
    category: 'Development',
    image: '/src/assets/Certificates/EBEON0522606394.webp',
    date: '2025'
  },
  {
    id: 'aptitude-test',
    title: 'Aptitude Test',
    issuer: 'Edu Bridge',
    category: 'Others',
    image: '/src/assets/Certificates/EBEON0622113708.webp',
    date: '2025'
  },
  {
    id: 'communication-english',
    title: 'Communication With Ease English',
    issuer: 'Edu Bridge',
    category: 'Others',
    image: '/src/assets/Certificates/EBEON0922117835.webp',
    date: '2025'
  },
  {
    id: 'financial-trading',
    title: 'Financial Markets & Trading Tactics',
    issuer: 'TopG Traders',
    category: 'Others',
    image: '/src/assets/Certificates/TopgTraders.webp',
    date: '2025'
  },
  {
    id: 'adv-excel',
    title: 'Advanced Excel Skills',
    issuer: 'elearnmarkets',
    category: 'Others',
    image: '/src/assets/Certificates/certificate (1).webp',
    date: '2025'
  },
  {
    id: 'android-nought-mobile-apps-training',
    title: 'Andriod Nought Mobile Apps Training',
    issuer: 'EDUCBA',
    category: 'Development',
    image: '/src/assets/Certificates/certificate (2).webp',
    date: '2025'
  },
  {
    id: 'py-3.5-training',
    title: 'Python 3.5 Training',
    issuer: 'EDUCBA',
    category: 'Programming',
    image: '/src/assets/Certificates/certificate (4).webp',
    date: '2025'
  },
  {
    id: 'java8-upgrade',
    title: 'Upgrading To Java8',
    issuer: 'EDUCBA',
    category: 'Development',
    image: '/src/assets/Certificates/certificate (6).webp',
    date: '2025'
  },
  {
    id: 'mobile-application',
    title: 'Mobile Application Development',
    issuer: 'Itronix Solutions',
    category: 'Development',
    image: '/src/assets/Certificates/certificate (7).webp',
    date: '2025'
  },
  {
    id: 'foxex-trading-master',
    title: 'Foxex Trading Master',
    issuer: 'European Open University',
    category: 'others',
    image: '/src/assets/Certificates/certificate-1-2.webp',
    date: '2025'
  },
  {
    id: 'web-security-by-msit',
    title: 'Web Security By MSIT',
    issuer: 'MSIT',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/1Jm0Rk.webp',
    date: '2025'
  },
  {
    id: 'web-security-find-and-fix-bugs-like-a-pro',
    title: 'Web Security Find And Fix Bugs Like A Pro',
    issuer: 'DevTown',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/1crWs5.webp',
    date: '2025'
  },
  {
    id: 'web-security-by-gdcoc',
    title: 'Web Security By GDCOC',
    issuer: 'Google Developers Group On Campus',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/1i1E7n.webp',
    date: '2025'
  },
  {
    id: 'web-security-by-devtown',
    title: 'Web Security By DevTown',
    issuer: 'DevTown',
    category: 'Cybersecurity',
    image: '/src/assets/Certificates/2shLGB.webp',
    date: '2025'
  }
];

const Certificates: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  // UX: Initial visible count of certificates to avoid overly long page
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter logic
  const filteredCertificates = CERTIFICATES.filter(
    (c) => selectedTab === 'All' || c.category === selectedTab
  );

  const displayedCertificates = filteredCertificates.slice(0, visibleCount);

  // Reset visible count on category change
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedTab]);

  // Sync body class for normal system cursor inside lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }
    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [lightboxIndex]);

  // Handle keys for lightbox (Escape to close, Arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredCertificates]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => 
      prev !== null && prev < filteredCertificates.length - 1 ? prev + 1 : 0
    );
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => 
      prev !== null && prev > 0 ? prev - 1 : filteredCertificates.length - 1
    );
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Zoom limits
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const nextZoom = Math.max(prev - 0.3, 1);
      if (nextZoom === 1) setPanOffset({ x: 0, y: 0 });
      return nextZoom;
    });
  };
  const handleZoomReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Dragging logic inside zoomed image
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="certificates" className="py-24 md:py-44 px-6 relative bg-base overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-purple/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] bg-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="mb-20 text-center md:text-left">
          <span className="font-label text-xs tracking-[0.4em] text-cyan uppercase mb-4 block">
            Verification &amp; Badges
          </span>
          <h2 className="text-5xl md:text-7xl font-syne font-bold leading-tight">
            Academic <br />
            <span className="text-glow-cyan text-cyan">Credentials.</span>
          </h2>
          <p className="text-muted font-mono text-xs md:text-sm mt-6 max-w-lg">
            A verified index of certifications spanning Artificial Intelligence, Cybersecurity, 
            Full-Stack Engineering, and Systems Operations. Drag, inspect, and hover to reveal details.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-14 pb-4 border-b border-white/5">
          {CATEGORIES.map((tab) => {
            const count = tab === 'All' 
              ? CERTIFICATES.length 
              : CERTIFICATES.filter((c) => c.category === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`relative px-5 py-3 font-label text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 interactive flex items-center gap-2 border border-white/5 hover:border-cyan/30 bg-surface/40`}
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
              >
                {selectedTab === tab && (
                  <motion.div
                    layoutId="activeTabOutline"
                    className="absolute inset-0 border border-cyan/50 shadow-[0_0_15px_rgba(0,229,255,0.2)] bg-cyan/5 -z-10"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={selectedTab === tab ? 'text-cyan font-bold' : 'text-muted'}>{tab}</span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${selectedTab === tab ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-dim'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certificate Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedCertificates.map((cert) => {
              const globalIndex = filteredCertificates.indexOf(cert);
              return (
                <CertificateCard 
                  key={cert.id} 
                  cert={cert} 
                  index={globalIndex} 
                  onClick={() => handleOpenLightbox(globalIndex)} 
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <Award className="mx-auto text-dim w-10 h-10 mb-4 animate-bounce" />
            <p className="font-mono text-sm text-muted">No certificates found in this ecosystem.</p>
          </div>
        )}

        {/* Dynamic Show More / Show Less Button */}
        {filteredCertificates.length > 6 && (
          <div className="flex justify-center mt-12 md:mt-16">
            <button
              onClick={() => {
                if (visibleCount >= filteredCertificates.length) {
                  setVisibleCount(6);
                  document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setVisibleCount(filteredCertificates.length);
                }
              }}
              className="px-8 py-3 bg-transparent text-cyan border border-cyan/30 hover:border-cyan hover:bg-cyan/10 transition-all duration-300 font-syne font-bold uppercase tracking-wider text-[10px] md:text-xs interactive"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              {visibleCount >= filteredCertificates.length 
                ? '[ Show Less Credentials ]' 
                : `[ Show All Credentials (+${filteredCertificates.length - 6}) ]`}
            </button>
          </div>
        )}

      </div>

      {/* Lightbox / Modal inspection view */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={lightboxRef}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 select-none"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-50">
              <div className="flex flex-col text-left">
                <span className="font-label text-[9px] tracking-widest text-cyan uppercase">
                  {filteredCertificates[lightboxIndex].category}
                </span>
                <h3 className="font-syne font-bold text-lg md:text-xl text-white">
                  {filteredCertificates[lightboxIndex].title}
                </h3>
                <span className="font-mono text-xs text-muted">
                  Issued by {filteredCertificates[lightboxIndex].issuer} · {filteredCertificates[lightboxIndex].date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Reset Zoom */}
                {zoomLevel > 1 && (
                  <button 
                    onClick={handleZoomReset} 
                    className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
                {/* Zoom out */}
                <button 
                  onClick={handleZoomOut} 
                  disabled={zoomLevel <= 1}
                  className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors disabled:opacity-40 disabled:hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                {/* Zoom in */}
                <button 
                  onClick={handleZoomIn} 
                  disabled={zoomLevel >= 3}
                  className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors disabled:opacity-40 disabled:hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                {/* Download */}
                <a 
                  href={filteredCertificates[lightboxIndex].image}
                  download={`Shaik_Farhaan_${filteredCertificates[lightboxIndex].id}.webp`}
                  className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors"
                  title="Download Certificate"
                >
                  <Download size={16} />
                </a>
                {/* Close */}
                <button 
                  onClick={handleCloseLightbox} 
                  className="p-2 border border-white/10 hover:border-rose-400 text-white hover:text-rose-400 transition-colors ml-4"
                  title="Close Modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body: Custom 3D responsive image container */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden my-4">
              
              {/* Prev Button */}
              <button 
                onClick={handlePrevLightbox}
                className="absolute left-2 md:left-6 z-40 p-4 bg-white/5 border border-white/10 text-white hover:text-cyan hover:border-cyan transition-all rounded-full flex items-center justify-center interactive"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Main Image Viewport */}
              <div 
                className={`relative w-full max-w-4xl max-h-[70vh] aspect-[1.414/1] flex items-center justify-center overflow-hidden
                  ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <motion.div
                  key={filteredCertificates[lightboxIndex].id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="relative pointer-events-none"
                  style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                    transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  <img
                    src={filteredCertificates[lightboxIndex].image}
                    alt={filteredCertificates[lightboxIndex].title}
                    className="max-w-full max-h-[70vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 rounded-lg"
                  />
                </motion.div>
              </div>

              {/* Next Button */}
              <button 
                onClick={handleNextLightbox}
                className="absolute right-2 md:right-6 z-40 p-4 bg-white/5 border border-white/10 text-white hover:text-cyan hover:border-cyan transition-all rounded-full flex items-center justify-center interactive"
              >
                <ChevronRight size={20} />
              </button>

            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 relative z-50">
              <span className="font-mono text-xs text-dim">
                Image {lightboxIndex + 1} of {filteredCertificates.length}
              </span>
              <div className="flex gap-4 mt-2 sm:mt-0 font-label text-[10px] text-muted tracking-wider uppercase">
                <span>[ Left/Right Arrow Key for Prev/Next ]</span>
                <span>[ Double Click / Scroll to Zoom ]</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* Mini card component with mouse coordinates holo updates and 3D tilting */
interface CardProps {
  cert: CertificateData;
  index: number;
  onClick: () => void;
}

const CertificateCard: React.FC<CardProps> = ({ cert, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variables for holographic shine gradient position
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

    // Subtle 3D tilt calculation
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6; // Max 6deg
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6; // Max 6deg

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.03 }}
      viewport={{ once: true }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        className="holo-card group relative bg-surface border border-white/5 hover:border-cyan/30 overflow-hidden shadow-lg p-3 rounded-2xl"
        style={{
          transition: 'transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
        }}
      >
        {/* Holographic Reflective Shine layer */}
        <div className="holo-shine" />

        {/* Certificate Image Frame */}
        <div className="relative aspect-[1.414/1] overflow-hidden rounded-xl bg-[#0a0a0f] border border-white/5 group-hover:border-cyan/10 transition-colors">
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            className="w-full h-full object-cover object-center grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
          />

          {/* Hover View Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
            <div className="w-10 h-10 rounded-full bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(0,229,255,0.3)] animate-pulse">
              <Eye size={18} />
            </div>
            <span className="font-label text-[10px] tracking-widest text-cyan uppercase font-bold">Inspect</span>
          </div>
        </div>

        {/* Card Info Details */}
        <div className="mt-4 p-2 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-[8px] tracking-widest text-cyan/70 border border-cyan/20 px-2 py-0.5 uppercase bg-cyan/5">
              {cert.category}
            </span>
            <span className="font-mono text-[9px] text-dim">{cert.date}</span>
          </div>
          <h4 className="font-syne font-bold text-sm text-white group-hover:text-cyan transition-colors leading-tight line-clamp-1">
            {cert.title}
          </h4>
          <p className="font-mono text-[10px] text-muted mt-1 uppercase tracking-wide">
            {cert.issuer}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Certificates;
