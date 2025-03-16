"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [mouseSpeed, setMouseSpeed] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let trailParticles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 10);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 2,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: `rgba(${Math.floor(Math.random() * 20 + 5)}, ${Math.floor(Math.random() * 20 + 5)}, ${Math.floor(Math.random() * 30 + 10)}, ${Math.random() * 0.2 + 0.7})`,
          originalSpeedX: Math.random() * 1 - 0.5,
          originalSpeedY: Math.random() * 1 - 0.5,
          hovered: false
        });
      }
    };
    
    const createTrailParticle = (x, y, speedX, speedY) => {
      const hue = (Date.now() / 50) % 360; // Cycling color based on time
      trailParticles.push({
        x,
        y,
        size: Math.random() * 4 + 2,
        speedX: speedX * 0.3 + (Math.random() * 0.4 - 0.2),
        speedY: speedY * 0.3 + (Math.random() * 0.4 - 0.2),
        color: `hsla(${hue}, 100%, 70%, ${Math.random() * 0.3 + 0.6})`,
        life: 1.0, // Full life
        decay: Math.random() * 0.02 + 0.01 // Random decay rate
      });
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const particle = trailParticles[i];
        
        // Update life
        particle.life -= particle.decay;
        
        if (particle.life <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Draw with fading based on life
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      // Create trail particles if mouse is moving fast
      if (mousePosition.x && mousePosition.y && (Math.abs(mouseSpeed.x) > 0.5 || Math.abs(mouseSpeed.y) > 0.5)) {
        const speed = Math.sqrt(mouseSpeed.x * mouseSpeed.x + mouseSpeed.y * mouseSpeed.y);
        const count = Math.floor(speed / 2) + 1;
        
        for (let i = 0; i < count; i++) {
          createTrailParticle(
            mousePosition.x, 
            mousePosition.y,
            mouseSpeed.x,
            mouseSpeed.y
          );
        }
      }
      
      // Draw main particles
      particles.forEach(particle => {
        // Determine if particle is hovered
        let isHovered = false;
        if (mousePosition.x && mousePosition.y) {
          const dx = particle.x - mousePosition.x;
          const dy = particle.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          isHovered = distance < 150;
          particle.hovered = isHovered;
        } else {
          particle.hovered = false;
        }
        
        // Draw particle with glow effect if hovered
        if (particle.hovered) {
          // Glowing effect for hovered particles
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          const hue = (Date.now() / 30) % 360; // Cycling color based on time
          gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.8)`);
          gradient.addColorStop(1, `hsla(${hue}, 100%, 70%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw the actual particle with a brighter color
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.9)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Normal particle
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Reset speeds to original if not affected by mouse
        if (mousePosition.x && mousePosition.y) {
          const dx = particle.x - mousePosition.x;
          const dy = particle.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Calculate angle from mouse to particle
            const angle = Math.atan2(dy, dx);
            
            // Stronger repulsion effect (increases with proximity)
            const repulsionStrength = 1.5 * (1 - distance / 150);
            
            // Apply repulsion force
            particle.speedX = particle.originalSpeedX + Math.cos(angle) * repulsionStrength;
            particle.speedY = particle.originalSpeedY + Math.sin(angle) * repulsionStrength;
          } else {
            // Gradually return to original speed when not affected
            particle.speedX = particle.speedX * 0.95 + particle.originalSpeedX * 0.05;
            particle.speedY = particle.speedY * 0.95 + particle.originalSpeedY * 0.05;
          }
        } else {
          // No mouse influence, return to original speed
          particle.speedX = particle.speedX * 0.95 + particle.originalSpeedX * 0.05;
          particle.speedY = particle.speedY * 0.95 + particle.originalSpeedY * 0.05;
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connections with hover effect
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // Check if connection is near mouse position
            let shouldBreak = false;
            let opacity = 0.5;
            let lineColor = `rgba(10, 10, 20, ${opacity})`;
            
            // If either particle is hovered, make the connection special
            if (particles[i].hovered || particles[j].hovered) {
              const hue = (Date.now() / 30) % 360;
              lineColor = `hsla(${hue}, 100%, 70%, ${opacity})`;
            }
            
            if (mousePosition.x && mousePosition.y) {
              // Calculate distance from mouse to line segment
              const lineLength = distance;
              const mouseToPt1X = mousePosition.x - particles[i].x;
              const mouseToPt1Y = mousePosition.y - particles[i].y;
              const mouseToPt2X = mousePosition.x - particles[j].x;
              const mouseToPt2Y = mousePosition.y - particles[j].y;
              
              // Calculate the projection of mouse point onto the line
              const dot = (mouseToPt1X * dx + mouseToPt1Y * dy) / (lineLength * lineLength);
              
              let mouseDistance;
              
              // If projection is outside the line segment, use distance to nearest endpoint
              if (dot < 0) {
                mouseDistance = Math.sqrt(mouseToPt1X * mouseToPt1X + mouseToPt1Y * mouseToPt1Y);
              } else if (dot > 1) {
                mouseDistance = Math.sqrt(mouseToPt2X * mouseToPt2X + mouseToPt2Y * mouseToPt2Y);
              } else {
                // Distance from point to line
                const projX = particles[i].x + dot * dx;
                const projY = particles[i].y + dot * dy;
                const perpX = mousePosition.x - projX;
                const perpY = mousePosition.y - projY;
                mouseDistance = Math.sqrt(perpX * perpX + perpY * perpY);
              }
              
              // Break connections near mouse with smooth transition
              if (mouseDistance < 100) {
                const breakFactor = 1 - mouseDistance / 100;
                opacity = 0.5 * (1 - breakFactor * 0.9);
                
                if (mouseDistance < 50) {
                  shouldBreak = true;
                }
              }
            }
            
            if (!shouldBreak) {
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Draw a more visible glow around the mouse cursor
      if (mousePosition.x && mousePosition.y) {
        const hue = (Date.now() / 30) % 360; // Cycling color based on time
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 150
        );
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, 0.1)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate mouse speed
      const now = Date.now();
      const dt = now - lastMousePos.current.time;
      if (dt > 0) {
        const dx = x - lastMousePos.current.x;
        const dy = y - lastMousePos.current.y;
        setMouseSpeed({
          x: dx / dt * 20, // Scale for better effect
          y: dy / dt * 20
        });
      }
      
      // Update last position
      lastMousePos.current = { x, y, time: now };
      
      // Update current position
      setMousePosition({ x, y });
    };
    
    const handleMouseLeave = () => {
      setMousePosition({ x: null, y: null });
      setMouseSpeed({ x: 0, y: 0 });
    };
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden relative min-h-[90vh] flex items-center">
      {/* Particle animation canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'auto', cursor: 'none' }}
      />
      
      {/* Background gradient blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="mb-6">
            <span className="block text-lg font-mono tracking-wider text-foreground/70 mb-2">REVOLUTIONIZING EDUCATION</span>
            <span className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 leading-tight">
              AI Course Generator
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-foreground/80 mb-8 max-w-3xl mx-auto">
            Custom <span className="font-semibold italic">Learning Paths</span>, Powered by AI
          </h2>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Unlock personalized education with AI-driven course creation. Tailor your learning
          journey to fit your unique goals and pace.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link 
            href="/get-started" 
            className="relative group overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-medium inline-flex items-center justify-center"
          >
            <span className="relative z-10">GET STARTED</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>
          
          <Link 
            href="/learn-more" 
            className="px-8 py-4 rounded-xl text-lg font-medium border border-foreground/10 hover:bg-background/50 transition-colors inline-flex items-center justify-center backdrop-blur-sm"
          >
            Learn More
          </Link>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-lg blur opacity-75"></div>
          <div className="relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Personalized Learning",
                  description: "Courses tailored to your specific needs and learning style",
                  color: "from-pink-500 to-red-500"
                },
                {
                  title: "AI-Powered Content",
                  description: "Intelligent algorithms create optimal learning sequences",
                  color: "from-purple-500 to-indigo-500"
                },
                {
                  title: "Track Progress",
                  description: "Monitor your advancement with detailed analytics",
                  color: "from-blue-500 to-cyan-500"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-background/80 backdrop-blur-sm p-6 rounded-md border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <h3 className={`text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 