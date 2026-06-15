import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view' | 'drag'>('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1 });
      gsap.to(ring, { x: clientX, y: clientY, duration: 0.4, ease: 'power3.out' });
    };

    const onMouseDown = () => gsap.to([cursor, ring], { scale: 0.75, duration: 0.15 });
    const onMouseUp = () => gsap.to([cursor, ring], { scale: 1, duration: 0.2 });

    // Context-aware cursor detection
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isProject = el.closest('[data-cursor="view"]') || el.closest('.group[data-project]');
      const isDraggable = el.closest('[data-cursor="drag"]') || el.closest('[class*="cursor-grab"]');
      const isLink = el.closest('a, button, .interactive');

      if (isProject) {
        setCursorState('view');
      } else if (isDraggable) {
        setCursorState('drag');
      } else if (isLink) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    const cursor = cursorRef.current;
    if (!ring || !cursor) return;

    if (cursorState === 'view') {
      gsap.to(ring, { width: 80, height: 80, opacity: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.2 });
    } else if (cursorState === 'drag') {
      gsap.to(ring, { width: 70, height: 70, opacity: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.2 });
    } else if (cursorState === 'hover') {
      gsap.to(ring, { width: 60, height: 60, opacity: 1, duration: 0.25 });
      gsap.to(cursor, { scale: 3, opacity: 0.4, duration: 0.25 });
    } else {
      gsap.to(ring, { width: 40, height: 40, opacity: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    }
  }, [cursorState]);

  const label = cursorState === 'view' ? 'VIEW' : cursorState === 'drag' ? 'DRAG' : '';

  return (
    <div className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference">
      {/* Ring */}
      <div
        ref={ringRef}
        className="w-10 h-10 border border-white rounded-full fixed -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200"
      >
        {label && (
          <span
            ref={labelRef}
            className="text-[8px] font-label font-bold text-white tracking-widest uppercase select-none"
          >
            {label}
          </span>
        )}
      </div>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="w-2 h-2 bg-white rounded-full fixed -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default CustomCursor;
