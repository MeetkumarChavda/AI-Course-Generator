"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';

export const AddCourseButton = ({ usedCourses = 0, maxCourses = 5 }) => {
    const isDisabled = usedCourses >= maxCourses;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 500, 
                damping: 25
            }}
        >
            <Link href={!isDisabled ? "/create-course" : "#"} passHref>
                <motion.div
                    className={`
                        relative group px-6 py-3 rounded-lg font-medium text-sm
                        ${isDisabled 
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 cursor-pointer'
                        }
                    `}
                    whileHover={!isDisabled ? { scale: 1.05 } : {}}
                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                >
                    <span className="flex items-center gap-2">
                        <FiPlus className="w-5 h-5" />
                        Create New Course
                    </span>
                
                    {isDisabled && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs"
                        >
                            Free tier limit reached
                        </motion.div>
                    )}
                </motion.div>
            </Link>
        </motion.div>
    );
};