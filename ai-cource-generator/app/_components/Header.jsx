"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <motion.header 
      className="border-b border-primary/10 py-4 px-4 md:px-8 lg:px-12 sticky top-0 z-50 bg-background/80 backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative w-10 h-10">
            <motion.svg 
              width="40" 
              height="40" 
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
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">AI Course Generator</span>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/get-started" 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
