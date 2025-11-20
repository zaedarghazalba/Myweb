import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './HyperspeedBackground.css';

export default function HyperspeedBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    const numStars = 200;
    const speed = 2;

    // Theme-based colors
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)';
    const trailColor = isDark ? '100, 149, 237' : '59, 130, 246'; // blue-500 for light
    const starColor = isDark ? '255, 255, 255' : '30, 58, 138'; // blue-900 for light

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          prevX: 0,
          prevY: 0
        });
      }
    };

    initStars();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach(star => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        const k = 128 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (
          px >= 0 &&
          px <= canvas.width &&
          py >= 0 &&
          py <= canvas.height
        ) {
          const size = (1 - star.z / canvas.width) * 2;
          const brightness = (1 - star.z / canvas.width) * (isDark ? 1 : 0.8);

          // Draw star trail
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${trailColor}, ${brightness})`;
          ctx.lineWidth = size;
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Draw star point
          ctx.fillStyle = `rgba(${starColor}, ${brightness})`;
          ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }

        star.prevX = px;
        star.prevY = py;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="hyperspeed-canvas"
    />
  );
}
