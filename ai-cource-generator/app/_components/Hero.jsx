"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function Hero() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
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
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.3 + 0.1})`
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
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
  }, []);
  
  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden relative min-h-[90vh] flex items-center">
      {/* Particle animation canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
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
