"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <motion.header 
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-primary/10 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9">
            <motion.svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 200 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {/* Colorful pinwheel logo */}
              <path d="M100,100 L130,50 Q140,30 120,40 L100,100" fill="#FF3366" />
              <path d="M100,100 L150,70 Q170,60 160,80 L100,100" fill="#FF9933" />
              <path d="M100,100 L150,130 Q170,140 150,150 L100,100" fill="#FFCC33" />
              <path d="M100,100 L130,150 Q140,170 120,160 L100,100" fill="#33CC66" />
              <path d="M100,100 L70,150 Q60,170 50,150 L100,100" fill="#33CCCC" />
              <path d="M100,100 L50,130 Q30,140 40,120 L100,100" fill="#3366FF" />
              <path d="M100,100 L50,70 Q30,60 50,50 L100,100" fill="#9933FF" />
              <path d="M100,100 L70,50 Q60,30 80,40 L100,100" fill="#FF33CC" />
            </motion.svg>
          </div>
          <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">AI Course Generator</span>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link 
              href="/get-started" 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition-opacity shadow-md"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
} 