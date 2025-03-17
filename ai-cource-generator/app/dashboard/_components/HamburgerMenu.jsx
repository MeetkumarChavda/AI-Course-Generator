"use client"

import React from 'react';
import { motion } from 'framer-motion';

export const HamburgerMenu = ({ isOpen, onClick }) => {
    const topLineVariants = {
        closed: { rotate: 0, y: 0 },
        open: { rotate: 45, y: 6 }
    };

    const bottomLineVariants = {
        closed: { rotate: 0, y: 0 },
        open: { rotate: -45, y: -6 }
    };

    return (
        <button
            onClick={onClick}
            className="w-10 h-10 flex flex-col items-center justify-center relative"
            aria-label="Toggle Menu"
        >
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={topLineVariants}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 absolute"
                style={{ originX: 0.5, originY: 0.5 }}
            />
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={bottomLineVariants}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 absolute"
                style={{ originX: 0.5, originY: 0.5 }}
            />
        </button>
    );
}; 