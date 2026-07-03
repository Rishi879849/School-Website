import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ role }) {
  const canvasRef = useRef(null);

  // Mapping role to specific RGB colors (Admin: blue, Teacher: green, Student: amber, Parent: purple)
  const getColorConfig = (activeRole) => {
    switch (activeRole) {
      case 'super_admin':
      case 'school_admin':
        return {
          primary: '37, 99, 235', // Vibrant Blue
          secondary: '100, 116, 139', // Slate
          density: 85
        };
      case 'principal':
        return {
          primary: '225, 29, 72', // Crimson
          secondary: '120, 113, 108', // Stone
          density: 80
        };
      case 'teacher':
        return {
          primary: '22, 163, 74', // Green
          secondary: '100, 116, 139', // Slate
          density: 80
        };
      case 'student':
        return {
          primary: '217, 119, 6', // Amber
          secondary: '120, 113, 108', // Stone
          density: 85
        };
      case 'parent':
        return {
          primary: '124, 58, 237', // Purple
          secondary: '100, 116, 139', // Slate
          density: 75
        };
      default:
        // Default brand site theme (Soft grey/charcoal with orange accents)
        return {
          primary: '255, 115, 59', // Orange accent
          secondary: '120, 113, 108', // Stone
          density: 80
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 160 };

    const colors = getColorConfig(role);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y, isSpawned = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * (isSpawned ? 2.0 : 0.6);
        this.vy = (Math.random() - 0.5) * (isSpawned ? 2.0 : 0.6);
        this.radius = Math.random() * 2 + (isSpawned ? 2.5 : 1);
        this.color = isSpawned ? colors.primary : colors.secondary;
        this.alpha = Math.random() * 0.18 + 0.12; // Lower opacity to stay readable on light background
        this.life = isSpawned ? 120 : Infinity;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (this.life !== Infinity) {
          this.life--;
          this.alpha = Math.max(0, (this.life / 120) * 0.25);
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleMouseClick = (e) => {
      const clusterSize = 8;
      for (let i = 0; i < clusterSize; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
      }
      if (particles.length > 250) {
        particles = particles.filter(p => p.life === Infinity || p.life > 0).slice(-180);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleMouseClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, idx) => {
        p.update();
        if (p.life !== Infinity && p.life <= 0) {
          particles.splice(idx, 1);
          return;
        }
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            const force = (mouse.radius - dist) / mouse.radius;
            ctx.strokeStyle = `rgba(${colors.primary}, ${force * 0.15})`;
            ctx.lineWidth = force * 1.2;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = ((120 - dist) / 120) * 0.07;
            ctx.strokeStyle = `rgba(${colors.secondary}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [role]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent"
    />
  );
}
