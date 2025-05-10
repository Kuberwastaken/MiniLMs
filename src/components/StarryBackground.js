import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StarsCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at bottom, #050505 0%, #000000 100%);
`;

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Create stars
    const createStars = (count) => {
      const stars = [];
      for (let i = 0; i < count; i++) {
        const starType = Math.random();
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2,
          opacity: Math.random() * 0.7 + 0.3,
          color: starType > 0.97 ? '#81d4fa' : 
                 starType > 0.92 ? '#e0e0e0' : '#ffffff',
          blinkSpeed: Math.random() * 0.015,
          isShimmering: Math.random() > 0.7
        });
      }
      return stars;
    };
    
    // Draw stars
    const drawStars = (stars, timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.closePath();
        
        // Update star properties for animation
        if (star.isShimmering) {
          star.opacity += star.blinkSpeed;
          if (star.opacity > 0.9 || star.opacity < 0.3) {
            star.blinkSpeed = -star.blinkSpeed;
          }
        }
        
        // Create a subtle gradient for larger stars
        if (star.radius > 0.8) {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 2
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = star.color;
        }
        
        ctx.globalAlpha = star.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };
    
    // Draw occasional shooting stars
    const shootingStar = {
      active: false,
      x: 0, 
      y: 0,
      length: 0,
      angle: 0,
      speed: 0,
      progress: 0
    };
    
    const triggerShootingStar = () => {
      if (Math.random() > 0.995 && !shootingStar.active) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * canvas.width;
        shootingStar.y = Math.random() * canvas.height * 0.5;
        shootingStar.length = 50 + Math.random() * 100;
        shootingStar.angle = (Math.PI / 4) + (Math.random() * Math.PI / 4);
        shootingStar.speed = 3 + Math.random() * 7;
        shootingStar.progress = 0;
      }
    };
    
    const drawShootingStar = () => {
      if (!shootingStar.active) return;
      
      shootingStar.progress += shootingStar.speed;
      
      if (shootingStar.progress > 100) {
        shootingStar.active = false;
        return;
      }
      
      const tailX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length * (shootingStar.progress / 100);
      const tailY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length * (shootingStar.progress / 100);
      
      const gradient = ctx.createLinearGradient(
        shootingStar.x, shootingStar.y,
        tailX, tailY
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.moveTo(shootingStar.x, shootingStar.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
      shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
    };
    
    // Initialize and start animation
    setCanvasDimensions();
    const stars = createStars(200);
    
    const animate = (timestamp) => {
      drawStars(stars, timestamp);
      triggerShootingStar();
      drawShootingStar();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      setCanvasDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <StarsCanvas ref={canvasRef} />;
};

export default StarryBackground;