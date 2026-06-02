import { useState, useEffect } from 'react';

export default function StarfieldBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get percentage positions
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: '#0A0A0B',
        overflow: 'hidden',
      }}
    >
      {/* Structural grid line pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.8,
        }}
      />

      {/* Static radial background gradient glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153, 255, 0, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'drift-slow 25s infinite alternate ease-in-out',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, transparent 75%)',
          filter: 'blur(80px)',
          animation: 'drift-slow-rev 30s infinite alternate ease-in-out',
        }}
      />

      {/* Interactive mouse spotlight glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, rgba(153, 255, 0, 0.045) 0%, transparent 80%)`,
          transition: 'background 0.1s ease',
        }}
      />

      {/* Animation styles */}
      <style>{`
        @keyframes drift-slow {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(40px, -50px) scale(1.1);
          }
          100% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes drift-slow-rev {
          0% {
            transform: translate(0px, 0px) scale(0.9);
          }
          50% {
            transform: translate(-30px, 40px) scale(1.05);
          }
          100% {
            transform: translate(20px, -20px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
