"use client"

import { motion } from "framer-motion"

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 relative overflow-hidden">
      {/* Left side - Visual Section */}
      <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-background to-background/80">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Animated blobs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl mix-blend-multiply"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl mix-blend-multiply"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 50, -20, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/3 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl mix-blend-multiply"
            animate={{
              x: [0, 20, -30, 0],
              y: [0, -20, 50, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          <motion.div 
            className="relative w-24 h-24 mb-8"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <svg 
              width="96" 
              height="96" 
              viewBox="0 0 200 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              <path d="M100,100 L130,50 Q140,30 120,40 L100,100" fill="#FF3366" />
              <path d="M100,100 L150,70 Q170,60 160,80 L100,100" fill="#FF9933" />
              <path d="M100,100 L150,130 Q170,140 150,150 L100,100" fill="#FFCC33" />
              <path d="M100,100 L130,150 Q140,170 120,160 L100,100" fill="#33CC66" />
              <path d="M100,100 L70,150 Q60,170 50,150 L100,100" fill="#33CCCC" />
              <path d="M100,100 L50,130 Q30,140 40,120 L100,100" fill="#3366FF" />
              <path d="M100,100 L50,70 Q30,60 50,50 L100,100" fill="#9933FF" />
              <path d="M100,100 L70,50 Q60,30 80,40 L100,100" fill="#FF33CC" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              AI Course Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Transform your learning journey with AI-powered personalized courses
            </p>
          </motion.div>
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMzAgMzBtLTMwIDBhMzAgMzAgMCAxIDAgNjAgMCAzMCAzMCAwIDEgMC02MCAweiIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjAgMGEyMCAyMCAwIDEgMCA0MCAwIDIwIDIwIDAgMSAwLTQwIDB6Ii8+PHBhdGggZD0iTTMwIDMwbS0xMCAwYTEwIDEwIDAgMSAwIDIwIDAgMTAgMTAgMCAxIDAtMjAgMHoiLz48L2c+PC9zdmc+')]" />
      </div>

      {/* Right side - Form Section */}
      <motion.div 
        className="relative flex items-center justify-center p-4 md:p-8 lg:p-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <motion.div 
              className="relative w-16 h-16 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <svg 
                width="64" 
                height="64" 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100,100 L130,50 Q140,30 120,40 L100,100" fill="#FF3366" />
                <path d="M100,100 L150,70 Q170,60 160,80 L100,100" fill="#FF9933" />
                <path d="M100,100 L150,130 Q170,140 150,150 L100,100" fill="#FFCC33" />
                <path d="M100,100 L130,150 Q140,170 120,160 L100,100" fill="#33CC66" />
                <path d="M100,100 L70,150 Q60,170 50,150 L100,100" fill="#33CCCC" />
                <path d="M100,100 L50,130 Q30,140 40,120 L100,100" fill="#3366FF" />
                <path d="M100,100 L50,70 Q30,60 50,50 L100,100" fill="#9933FF" />
                <path d="M100,100 L70,50 Q60,30 80,40 L100,100" fill="#FF33CC" />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              AI Course Generator
            </h1>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  )
} 