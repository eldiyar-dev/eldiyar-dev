'use client';
import {gsap} from 'gsap';
import {useLayoutEffect, useRef, type ReactNode} from 'react';

export type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section';
};

/** Анимирует появление контента в области просмотра с учётом reduced motion. */
export function Reveal({children, delay = 0, className, as = 'div'}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Element = as;

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;

    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const animation = gsap.fromTo(element, {opacity: 0, y: -22}, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        delay: delay / 1000,
        ease: 'power1.out',
        paused: true,
        immediateRender: true,
        clearProps: 'opacity,transform',
      });

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animation.restart(true);
      });

      observer.observe(element);
      return () => observer.disconnect();
    });

    return () => motion.revert();
  }, [as, delay]);

  return <Element ref={element => {ref.current = element;}} className={className}>{children}</Element>;
}
