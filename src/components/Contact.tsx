import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSend } from 'react-icons/io5';
import React, { useRef, useState, useEffect } from 'react';
import Magnetic from './Magnetic';


const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | null }>({ message: '', type: null });
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setIstTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || publicKey === 'YOUR_PUBLIC_KEY') {
      setIsSending(false);
      showToast('Configuration Error: Please check your .env file and RESTART the server.', 'error');
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
    .then(() => {
      setIsSending(false);
      showToast('Message sent successfully! I will get back to you soon.', 'success');
      form.current?.reset();
    }, (error) => {
      setIsSending(false);
      const errorMsg = error.status === 412 
        ? 'Error 412: Unauthorized domain or invalid public key. Check EmailJS dashboard.'
        : 'Failed to send message. Please try again.';
      showToast(errorMsg, 'error');
      console.error('EmailJS Error:', error);
    });
  };

  return (
    <section id="contact" className="py-24 md:py-44 bg-base px-6 relative overflow-hidden">
      {/* Faded HELLO background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-syne font-black text-[15vw] text-white/[0.02] leading-none">HELLO.</span>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 w-full"
        >
          <span className="font-label text-xs tracking-[0.4em] text-cyan uppercase mb-6 block">Contact</span>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="font-label text-xs tracking-[0.3em] text-green-400 uppercase">Availability: High</span>
            </div>
            <div className="font-mono text-xs text-dim tracking-widest">
              🕐 IST {istTime}
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-syne font-extrabold mb-8 relative group cursor-default">
            <span className="relative z-10">Let's build</span> <br />
            <span className="text-cyan group-hover:glitch-effect transition-all duration-300">something.</span>
          </h2>
          <p className="text-muted font-mono text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            Open to freelance, full-time remote roles, and interesting problems. <br />
            <span className="text-cyan/60">Response time: under 24 hours.</span>
          </p>
        </motion.div>

        {/* Form */}
        <form ref={form} onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-8 mb-20 text-left">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-dim uppercase tracking-widest">// your name</label>
            <input 
              required
              name="from_name"
              type="text" 
              className="bg-surface border border-white/5 focus:border-cyan/50 p-4 font-mono text-sm outline-none transition-all placeholder:text-dim"
              placeholder="Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-dim uppercase tracking-widest">// your email</label>
            <input 
              required
              name="from_email"
              type="email" 
              className="bg-surface border border-white/5 focus:border-cyan/50 p-4 font-mono text-sm outline-none transition-all placeholder:text-dim"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-dim uppercase tracking-widest">// what's on your mind</label>
            <textarea 
              required
              name="message"
              rows={4}
              className="bg-surface border border-white/5 focus:border-cyan/50 p-4 font-mono text-sm outline-none transition-all placeholder:text-dim resize-none"
              placeholder="Message"
            />
          </div>

          <Magnetic strength={0.1}>
            <button 
              disabled={isSending}
              className={`w-full py-4 border flex items-center justify-center gap-3 font-syne font-bold uppercase tracking-widest transition-all duration-500
                ${isSending ? 'border-dim text-dim cursor-not-allowed' : 'border-cyan text-cyan hover:bg-cyan hover:text-base shadow-[0_0_20px_rgba(0,229,255,0.1)]'}`}
            >
              {isSending ? 'Sending...' : <>Send Message <IoSend size={16} /></>}
            </button>
          </Magnetic>
        </form>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast.type && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: "-50%", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: -50, x: "-50%", scale: 0.9 }}
              className={`fixed top-10 left-1/2 z-[1000] flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl w-[90%] max-w-[400px]
                ${toast.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                  : 'bg-red-500/10 border-red-500/50 text-red-400'}`}
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 animate-pulse ${toast.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`} />
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold leading-tight">
                {toast.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .glitch-effect:hover {
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 500ms infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
