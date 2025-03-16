"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden relative">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4">
            AI Course Generator
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 mb-8">
            Custom Learning Paths, Powered by AI
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link 
            href="/get-started" 
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:opacity-90 transition-opacity"
          >
            GET STARTED
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-16 relative"
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
