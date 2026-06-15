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
  Eye,
  Terminal,
  Layers,
  Cpu
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
    category: 'Others', // Normalized to capital 'Others' to group properly
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  
  // Responsive view layout state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Lightbox Inspection State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Dragging logic for rotating fanned cards
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);

  // Terminal log simulator state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [decryptionProgress, setDecryptionProgress] = useState(0);

  // Filtered dataset
  const filteredCertificates = CERTIFICATES.filter(
    (c) => selectedTab === 'All' || c.category === selectedTab
  );

  // Reset active card index when selected tab changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedTab]);

  // Decryption progress loading animation
  useEffect(() => {
    setDecryptionProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      if (current < 100) {
        current += 10;
        setDecryptionProgress(current);
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [activeIndex, selectedTab]);

  // Terminal log scanning simulation
  useEffect(() => {
    if (filteredCertificates.length === 0 || activeIndex >= filteredCertificates.length) return;
    const activeCert = filteredCertificates[activeIndex];

    const sequences = [
      `SYS: INITIALIZING SECURE SCANS...`,
      `SYS: DECRYPTING CREDENTIAL BLOCKS...`,
      `SEC: VERIFYING CRYPTO ENVELOPES...`,
      `SEC: CERTIFICATE IDENTIFICATION: ${activeCert.id.toUpperCase()}`,
      `SEC: SIGNATURE MATCHED WITH ${activeCert.issuer.toUpperCase()}`,
      `SYS: STATUS: VERIFIED // ACTIVE ACCESS.`
    ];

    setTerminalLogs([]);
    let counter = 0;
    
    const interval = setInterval(() => {
      if (counter < sequences.length) {
        const logToAppend = sequences[counter];
        setTerminalLogs(prev => [...prev, logToAppend]);
        counter++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [activeIndex, selectedTab]);

  // Lightbox key bindings (Escape, arrows)
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

  // Zoom logic
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

  // Lightbox Zoom dragging
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

  // Carousel Swiping Swipe trigger delta
  const handleSwipeStart = (clientX: number) => {
    setSwipeStartX(clientX);
  };

  const handleSwipeMove = (clientX: number) => {
    if (swipeStartX === null) return;
    const diff = clientX - swipeStartX;
    if (diff > 85) {
      handlePrevCard();
      setSwipeStartX(null);
    } else if (diff < -85) {
      handleNextCard();
      setSwipeStartX(null);
    }
  };

  const handleSwipeEnd = () => {
    setSwipeStartX(null);
  };

  const handleNextCard = () => {
    if (filteredCertificates.length === 0) return;
    setActiveIndex((prev) => (prev < filteredCertificates.length - 1 ? prev + 1 : 0));
  };

  const handlePrevCard = () => {
    if (filteredCertificates.length === 0) return;
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredCertificates.length - 1));
  };

  const activeCert = filteredCertificates[activeIndex] || null;

  return (
    <section id="certificates" className="py-24 md:py-44 px-6 relative bg-base overflow-hidden">
      {/* Dynamic Ambient Background Nodes */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-purple/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] bg-cyan/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Title Block & Layout Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-center md:text-left">
            <span className="font-label text-xs tracking-[0.4em] text-cyan uppercase mb-4 block">
              Credentials Index
            </span>
            <h2 className="text-5xl md:text-7xl font-syne font-bold leading-tight">
              Credentials &amp; <br />
              <span className="text-glow-cyan text-cyan">Accolades.</span>
            </h2>
          </div>

          {/* Interactive Layout View Mode Selector */}
          <div className="flex items-center justify-center gap-4 self-center md:self-end">
            <button
              onClick={() => setViewMode('3d')}
              className={`p-3 border transition-all duration-300 flex items-center gap-2 font-label text-[10px] tracking-widest uppercase interactive
                ${viewMode === '3d' ? 'border-cyan text-cyan bg-cyan/5' : 'border-white/5 text-muted hover:border-cyan/30'}`}
              style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
            >
              <Cpu size={14} /> Spatial Deck
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 border transition-all duration-300 flex items-center gap-2 font-label text-[10px] tracking-widest uppercase interactive
                ${viewMode === 'grid' ? 'border-cyan text-cyan bg-cyan/5' : 'border-white/5 text-muted hover:border-cyan/30'}`}
              style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
            >
              <Layers size={14} /> Classic Grid
            </button>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-16 pb-4 border-b border-white/5">
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

        {filteredCertificates.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
            <Award className="mx-auto text-dim w-12 h-12 mb-4 animate-bounce" />
            <p className="font-mono text-sm text-muted">No certificates mapped in this classification.</p>
          </div>
        ) : viewMode === '3d' ? (
          /* ========================================================================= */
          /* MODE: FUTURISTIC 3D DECK AND HUD SPLIT SYSTEM                             */
          /* ========================================================================= */
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-12 items-start relative min-h-[580px]">
            
            {/* L-PANE: Terminal HUD diagnostics console */}
            <div 
              className="order-2 lg:order-1 lg:col-span-2 bg-surface/50 border border-white/5 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden w-full"
              style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan/5 rounded-bl-full pointer-events-none -z-10" />

              {/* Console Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="text-cyan w-4 h-4 animate-pulse" />
                  <span className="font-mono text-xs text-dim uppercase tracking-widest font-bold">Diagnostic HUD</span>
                </div>
                <div className="flex items-center gap-2 font-label text-[8px] tracking-widest border border-green-500/30 text-green-400 bg-green-500/5 px-2.5 py-1 uppercase rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  Verified secure
                </div>
              </div>

              {activeCert && (
                <div className="flex flex-col gap-6 text-left">
                  
                  {/* Miniature laser scanning thumbnail wrapper */}
                  <div 
                    onClick={() => handleOpenLightbox(activeIndex)}
                    className="hidden md:block relative aspect-[1.414/1] overflow-hidden rounded-xl bg-black border border-white/10 group cursor-pointer"
                  >
                    {/* Corner HUD crosshairs */}
                    <div className="hud-corner top-2 left-2 border-t border-l" />
                    <div className="hud-corner top-2 right-2 border-t border-r" />
                    <div className="hud-corner bottom-2 left-2 border-b border-l" />
                    <div className="hud-corner bottom-2 right-2 border-b border-r" />

                    {/* Glowing scanning laser line */}
                    <div className="scanner-line" />
                    
                    <img 
                      src={activeCert.image} 
                      alt={activeCert.title} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px]">
                      <div className="w-9 h-9 rounded-full bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                        <Eye size={14} />
                      </div>
                      <span className="font-label text-[9px] tracking-widest text-cyan uppercase font-bold">Inspect Source</span>
                    </div>
                  </div>

                  {/* Decryption status and progress bar */}
                  <div className="flex flex-col gap-2 bg-black/30 border border-white/5 p-4 rounded-xl font-mono text-xs">
                    <div className="flex justify-between items-center text-[10px] text-dim tracking-wider uppercase font-bold">
                      <span>Decryption Status</span>
                      <span className={decryptionProgress === 100 ? 'text-green-400' : 'text-cyan animate-pulse'}>
                        {decryptionProgress === 100 ? 'SECURE // 100%' : `SCANNING // ${decryptionProgress}%`}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 border border-white/5 relative overflow-hidden rounded-full">
                      <div 
                        className="bg-cyan h-full transition-all duration-150 shadow-[0_0_8px_#00e5ff]" 
                        style={{ width: `${decryptionProgress}%` }} 
                      />
                    </div>
                  </div>

                  {/* Metadata fields */}
                  <div className="flex flex-col gap-3 font-mono text-xs border-y border-white/5 py-4">
                    <p className="flex justify-between items-start gap-4">
                      <span className="text-dim uppercase tracking-wider shrink-0">// CREDENTIAL:</span>
                      <span className="text-white font-syne font-bold text-right text-sm tracking-tight leading-tight line-clamp-1">{activeCert.title}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-dim uppercase tracking-wider">// ISSUER:</span>
                      <span className="text-cyan font-bold">{activeCert.issuer}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-dim uppercase tracking-wider">// CLASSIFICATION:</span>
                      <span className="text-amber border border-amber/30 px-2 py-0.5 bg-amber/5 text-[9px] uppercase tracking-widest">{activeCert.category}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-dim uppercase tracking-wider">// HASH REFERENCE:</span>
                      <span className="text-dim font-bold font-mono tracking-tight text-[10px] break-all select-all">
                        0x{activeCert.id.slice(0, 6).toUpperCase()}{activeCert.id.length * 7}F9{activeCert.date}
                      </span>
                    </p>
                  </div>

                  {/* Telemetry Visualizer Graph & HUD Stats */}
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col gap-1 font-mono text-[9px] text-dim text-left">
                      <p>// RADAR LEVEL: <span className="text-cyan font-bold">42.8 DB</span></p>
                      <p>// DECRYPTION RATE: <span className="text-cyan font-bold">AES-256</span></p>
                      <p>// CORE SCANNER: <span className="text-green-400 font-bold">NOMINAL</span></p>
                    </div>
                    {/* Bouncing spectrum visualizer */}
                    <div className="flex items-end justify-between h-9 bg-black/40 p-2 border border-white/5 rounded-xl overflow-hidden shrink-0">
                      <div className="w-1 bg-cyan/80 tel-bar-1 h-2" />
                      <div className="w-1 bg-cyan/80 tel-bar-2 h-4" />
                      <div className="w-1 bg-cyan/80 tel-bar-3 h-1" />
                      <div className="w-1 bg-cyan/80 tel-bar-4 h-3" />
                      <div className="w-1 bg-cyan/80 tel-bar-5 h-5" />
                      <div className="w-1 bg-cyan/80 tel-bar-2 h-2" />
                      <div className="w-1 bg-cyan/80 tel-bar-1 h-3" />
                      <div className="w-1 bg-cyan/80 tel-bar-3 h-1" />
                      <div className="w-1 bg-cyan/80 tel-bar-4 h-4" />
                      <div className="w-1 bg-cyan/80 tel-bar-5 h-2" />
                      <div className="w-1 bg-cyan/80 tel-bar-2 h-5" />
                      <div className="w-1 bg-cyan/80 tel-bar-1 h-1" />
                    </div>
                  </div>

                  {/* Simulated Secure Readout Logs */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-xl font-mono text-[9px] md:text-[10px] leading-relaxed text-dim h-32 overflow-y-auto select-none">
                    <AnimatePresence>
                      {terminalLogs.map((logLine, logIdx) => {
                        if (!logLine) return null;
                        let colorClass = "text-dim";
                        if (logLine.includes("SEC:")) colorClass = "text-amber/80";
                        if (logLine.includes("STATUS:")) colorClass = "text-green-400 font-bold";
                        return (
                          <motion.p
                            key={logIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`mb-1 tracking-wider ${colorClass}`}
                          >
                            {logLine}
                          </motion.p>
                        );
                      })}
                    </AnimatePresence>
                    <div className="inline-block w-1.5 h-3 bg-cyan ml-1 animate-pulse" />
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleOpenLightbox(activeIndex)}
                      className="flex-1 py-3 border border-cyan text-cyan hover:bg-cyan hover:text-base font-syne font-bold uppercase tracking-wider text-[10px] transition-all duration-300"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                    >
                      Inspect Large
                    </button>
                    <a
                      href={activeCert.image}
                      download={`Shaik_Farhaan_${activeCert.id}.webp`}
                      className="px-5 py-3 border border-white/10 text-white hover:text-cyan hover:border-cyan hover:bg-cyan/5 transition-all duration-300 flex items-center justify-center"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                      title="Download Verification Document"
                    >
                      <Download size={14} />
                    </a>
                  </div>

                </div>
              )}
            </div>

            {/* R-PANE: 3D perspective stage for fanned stack */}
            <div className="order-1 lg:order-2 lg:col-span-3 flex flex-col items-center justify-center min-h-[420px] md:min-h-[500px] relative w-full select-none">
              
              {/* Drag/Swipe instruction overlay */}
              <div className="absolute top-0 right-4 font-mono text-[9px] text-dim tracking-wider uppercase">
                [ Drag Stack / Swipe Left-Right to Rotate ]
              </div>

              {/* 3D Perspective Stack Stage */}
              <div 
                onMouseDown={(e) => handleSwipeStart(e.clientX)}
                onMouseMove={(e) => handleSwipeMove(e.clientX)}
                onMouseUp={handleSwipeEnd}
                onMouseLeave={handleSwipeEnd}
                onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleSwipeMove(e.touches[0].clientX)}
                onTouchEnd={handleSwipeEnd}
                className="perspective-stage w-full max-w-[240px] md:max-w-[340px] aspect-[1.414/1] relative flex items-center justify-center"
                style={{ height: '320px' }}
              >
                {filteredCertificates.map((cert, i) => {
                  const distance = i - activeIndex;
                  const absDistance = Math.abs(distance);
                  const isActive = distance === 0;

                  // Render threshold (hide cards that are far away from active view to boost rendering speed)
                  if (absDistance > 4) return null;

                  // Compute inline styles based on z-stack variables
                  const translateX = distance * (isMobile ? 55 : 115);
                  const translateZ = -absDistance * (isMobile ? 70 : 105);
                  const rotateY = distance * -24;
                  const scale = 1 - absDistance * (isMobile ? 0.08 : 0.11);
                  const opacity = 1 - Math.min(absDistance * 0.35, 0.95);
                  const zIndex = 100 - absDistance;

                  return (
                    <div
                      key={cert.id}
                      onClick={() => setActiveIndex(i)}
                      className={`absolute w-full aspect-[1.414/1] rounded-2xl overflow-hidden bg-surface border shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer
                        ${isActive 
                          ? 'border-cyan/40 holo-border-glow' 
                          : 'border-white/5 opacity-60 hover:opacity-90'}`}
                      style={{
                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        opacity,
                        zIndex,
                        transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                        transformStyle: 'preserve-3d',
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                      }}
                    >
                      {/* Holographic light layer overlay on active element */}
                      {isActive && <div className="holo-shine" />}

                      <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-cover select-none pointer-events-none grayscale-[25%] hover:grayscale-0 transition-all duration-500"
                      />

                      {/* Small visual HUD layer inside cards */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/50 font-mono text-[8px] bg-black/45 backdrop-blur-[2px] p-2 border border-white/5 rounded-lg select-none pointer-events-none">
                        <span className="truncate max-w-[150px]">{cert.title.toUpperCase()}</span>
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console Deck Dial Controllers */}
              <div className="flex items-center gap-6 mt-12 z-20">
                <button
                  onClick={handlePrevCard}
                  className="p-3 bg-surface/50 border border-white/10 hover:border-cyan text-white hover:text-cyan rounded-full transition-all active:scale-95 interactive"
                  title="Previous Deck Item"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {/* Digit readout count */}
                <div className="font-mono text-[10px] text-muted tracking-widest bg-black/40 border border-white/5 px-4 py-2 flex gap-2">
                  <span className="text-cyan font-bold">
                    {(activeIndex + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-dim">/</span>
                  <span>
                    {filteredCertificates.length.toString().padStart(2, '0')}
                  </span>
                </div>

                <button
                  onClick={handleNextCard}
                  className="p-3 bg-surface/50 border border-white/10 hover:border-cyan text-white hover:text-cyan rounded-full transition-all active:scale-95 interactive"
                  title="Next Deck Item"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Slider timeline selector bar */}
              <div className="mt-8 w-full max-w-xs flex gap-1 justify-center z-20">
                {filteredCertificates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="group py-2 flex-1"
                  >
                    <div 
                      className={`h-[3px] rounded-full transition-all duration-300
                        ${i === activeIndex 
                          ? 'bg-cyan shadow-[0_0_8px_#00e5ff] w-full' 
                          : 'bg-white/10 group-hover:bg-cyan/40 w-full'}`}
                    />
                  </button>
                ))}
              </div>

            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* MODE: CLASSIC RESPONSIVE GRID (AS FALLBACK)                               */
          /* ========================================================================= */
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert, index) => (
                <div
                  key={cert.id}
                  onClick={() => handleOpenLightbox(index)}
                  className="relative cursor-pointer"
                >
                  <div
                    className="holo-card group relative bg-surface border border-white/5 hover:border-cyan/30 overflow-hidden shadow-lg p-3 rounded-2xl"
                    style={{
                      transition: 'transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                    }}
                  >
                    <div className="holo-shine" />

                    <div className="relative aspect-[1.414/1] overflow-hidden rounded-xl bg-black border border-white/5">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px]">
                        <div className="w-10 h-10 rounded-full bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                          <Eye size={18} />
                        </div>
                        <span className="font-label text-[10px] tracking-widest text-cyan uppercase font-bold">Inspect</span>
                      </div>
                    </div>

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
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
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
            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-50 text-left">
              <div className="flex flex-col">
                <span className="font-label text-[9px] tracking-widest text-cyan uppercase">
                  {filteredCertificates[lightboxIndex].category}
                </span>
                <h3 className="font-syne font-bold text-lg md:text-xl text-white leading-snug">
                  {filteredCertificates[lightboxIndex].title}
                </h3>
                <span className="font-mono text-xs text-muted">
                  Issued by {filteredCertificates[lightboxIndex].issuer} · {filteredCertificates[lightboxIndex].date}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {zoomLevel > 1 && (
                  <button 
                    onClick={handleZoomReset} 
                    className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
                <button 
                  onClick={handleZoomOut} 
                  disabled={zoomLevel <= 1}
                  className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors disabled:opacity-40 disabled:hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <button 
                  onClick={handleZoomIn} 
                  disabled={zoomLevel >= 3}
                  className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors disabled:opacity-40 disabled:hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <a 
                  href={filteredCertificates[lightboxIndex].image}
                  download={`Shaik_Farhaan_${filteredCertificates[lightboxIndex].id}.webp`}
                  className="p-2 border border-white/10 hover:border-cyan text-white hover:text-cyan transition-colors"
                  title="Download Certificate"
                >
                  <Download size={16} />
                </a>
                <button 
                  onClick={handleCloseLightbox} 
                  className="p-2 border border-white/10 hover:border-rose-400 text-white hover:text-rose-400 transition-colors ml-4"
                  title="Close Modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body: Custom zoomable image viewer */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden my-4">
              
              <button 
                onClick={handlePrevLightbox}
                className="absolute left-2 md:left-6 z-45 p-4 bg-white/5 border border-white/10 text-white hover:text-cyan hover:border-cyan transition-all rounded-full flex items-center justify-center interactive"
              >
                <ChevronLeft size={20} />
              </button>

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

              <button 
                onClick={handleNextLightbox}
                className="absolute right-2 md:right-6 z-45 p-4 bg-white/5 border border-white/10 text-white hover:text-cyan hover:border-cyan transition-all rounded-full flex items-center justify-center interactive"
              >
                <ChevronRight size={20} />
              </button>

            </div>

            {/* Modal Footer */}
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

export default Certificates;
