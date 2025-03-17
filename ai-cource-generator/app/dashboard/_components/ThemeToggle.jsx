"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <FiMoon className="w-5 h-5 text-purple-500" />
                ) : (
                    <FiSun className="w-5 h-5 text-amber-500" />
                )}
            </motion.div>
        </motion.button>
    );
}; 