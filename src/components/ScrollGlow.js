// import React, { useEffect, useRef } from 'react';
// import './ScrollGlow.css';

// const ScrollGlow = () => {
//   const ref = useRef(null);

//   useEffect(() => {
//     let fadeOutTimer = null;

//     const showTint = () => {
//       if (!ref.current) return;

//       const scrollTop = window.scrollY;
//       const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
//       const angle = 135 + progress * 180;

//       ref.current.style.background = `linear-gradient(${angle.toFixed(0)}deg,
//         rgba(237, 108, 44, 0.9) 0%,
//         rgba(255, 140, 66, 0.6) 30%,
//         rgba(255, 107, 53, 0.3) 60%,
//         transparent 100%)`;

//       // Show tint
//       ref.current.style.opacity = '0.15';

//       // Clear any existing fade-out timer
//       clearTimeout(fadeOutTimer);

//       // Fade out after user stops scrolling (300ms idle)
//       fadeOutTimer = setTimeout(() => {
//         if (ref.current) {
//           ref.current.style.opacity = '0';
//         }
//       }, 300);
//     };

//     window.addEventListener('scroll', showTint, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', showTint);
//       clearTimeout(fadeOutTimer);
//     };
//   }, []);

//   return <div className="scroll-glow" ref={ref} aria-hidden="true" />;
// };

// export default ScrollGlow;
