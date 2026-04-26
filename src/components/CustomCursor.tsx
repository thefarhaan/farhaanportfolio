import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Immediate move for the dot
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      // Eased move for the ring
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.4, // Lag effect
        ease: 'power3.out',
      });
    };

    const onMouseDown = () => gsap.to([cursor, ring], { scale: 0.8, duration: 0.2 });
    const onMouseUp = () => gsap.to([cursor, ring], { scale: 1, duration: 0.2 });

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Attach to all interactive elements
    const updateLinks = () => {
      const links = document.querySelectorAll('a, button, .interactive');
      links.forEach((link) => {
        link.addEventListener('mouseenter', onMouseEnterLink);
        link.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    updateLinks();
    
    // Mutation observer to handle dynamically added elements if any
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(ringRef.current, {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        borderColor: '#00E5FF',
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        scale: 4,
        opacity: 0.5,
        duration: 0.3,
      });
    } else {
      gsap.to(ringRef.current, {
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        borderColor: 'rgba(0, 229, 255, 0.5)',
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });
    }
  }, [isHovering]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9999]">
      <div
        ref={ringRef}
        className="w-10 h-10 border border-cyan/50 rounded-full fixed -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
      />
      <div
        ref={cursorRef}
        className="w-1.5 h-1.5 bg-cyan rounded-full fixed -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00E5FF]"
      />
    </div>
  );
};

export default CustomCursor;
