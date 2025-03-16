"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function Hero() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let stars = [];
    
    // Enhanced color palette
    const colorPalette = {
      light: [
        'rgba(236, 72, 153, 0.4)', // pink-500
        'rgba(168, 85, 247, 0.4)', // purple-500
        'rgba(59, 130, 246, 0.4)', // blue-500
        'rgba(236, 72, 153, 0.2)', // lighter variants
        'rgba(168, 85, 247, 0.2)',
        'rgba(59, 130, 246, 0.2)',
      ],
      dark: [
        'rgba(236, 72, 153, 0.5)',
        'rgba(168, 85, 247, 0.5)',
        'rgba(59, 130, 246, 0.5)',
        'rgba(236, 72, 153, 0.3)',
        'rgba(168, 85, 247, 0.3)',
        'rgba(59, 130, 246, 0.3)',
      ]
    };
    
    // Initialize stars
    const initStars = () => {
      stars = [];
      const starCount = Math.floor(window.innerWidth / 8);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          twinkleSpeed: 0.05 + Math.random() * 0.05,
          twinklePhase: Math.random() * Math.PI * 2,
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.4)'
        });
      }
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initStars();
    };
    
    const getRandomColor = () => {
      const colors = theme === 'dark' ? colorPalette.dark : colorPalette.light;
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 15); // Slightly more particles
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 1.5, // Faster movement
          speedY: (Math.random() - 0.5) * 1.5,
          color: getRandomColor(),
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.02
        });
      }
    };
    
    const drawParticles = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with twinkling effect
      stars.forEach(star => {
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        ctx.fillStyle = star.color.replace(')', `, ${twinkle})`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.twinklePhase += star.twinkleSpeed;
      });

      // Draw particles with pulsing effect
      particles.forEach(particle => {
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulsePhase += particle.pulseSpeed;
        
        // Bounce off edges instead of wrapping
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      // Draw connections with enhanced gradient lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 180) { // Increased connection distance
            const opacity = (1 - distance / 180) * (theme === 'dark' ? 0.2 : 0.15);
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            const color1 = particles[i].color.replace(/[\d.]+\)$/g, '1)');
            const color2 = particles[j].color.replace(/[\d.]+\)$/g, '1)');
            
            gradient.addColorStop(0, color1.replace('1)', `${opacity})`));
            gradient.addColorStop(1, color2.replace('1)', `${opacity})`));
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 overflow-hidden relative min-h-[90vh] flex items-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-75 transition-opacity duration-300"
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/30 dark:bg-pink-500/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-20 w-80 h-80 bg-purple-500/30 dark:bg-purple-500/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/30 dark:bg-blue-500/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="mb-4 sm:mb-6">
            <span className="block text-sm sm:text-lg font-mono tracking-wider text-foreground/70 mb-1 sm:mb-2">REVOLUTIONIZING EDUCATION</span>
            <span className="text-3xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 leading-tight">
              AI Course Generator
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-foreground/80 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Custom <span className="font-semibold italic">Learning Paths</span>, Powered by AI
          </h2>
        </motion.div>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12"
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
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10 sm:mb-16"
        >
          <Link 
            href="/get-started" 
            className="relative group overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium inline-flex items-center justify-center whitespace-nowrap"
          >
            <span className="relative z-10">GET STARTED</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>
          
          <Link 
            href="/learn-more" 
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium border border-foreground/10 hover:bg-background/50 transition-colors inline-flex items-center justify-center backdrop-blur-sm whitespace-nowrap"
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
          <div className="relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                  className="bg-background/80 backdrop-blur-sm p-4 sm:p-6 rounded-md border border-white/10
                             hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10
                             transition-all duration-300 ease-in-out"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3 className={`text-base sm:text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
