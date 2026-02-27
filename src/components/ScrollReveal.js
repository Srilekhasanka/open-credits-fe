import React, { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

/**
 * Wraps children and reveals them with an animation when scrolled into view.
 *
 * @param {'fade-up'|'fade-in'|'fade-left'|'fade-right'|'zoom-in'} variant
 * @param {number} delay  – extra delay in ms (useful for staggering siblings)
 * @param {number} threshold – 0‑1, how much of the element must be visible (default 0.15)
 */
const ScrollReveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
  ...rest
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport at mount time (e.g. rendered after async data load)
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0 &&
      rect.left < window.innerWidth && rect.right > 0;

    if (alreadyVisible) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal scroll-reveal--${variant}${visible ? ' scroll-reveal--visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
