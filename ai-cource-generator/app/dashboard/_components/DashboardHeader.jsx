"use client"

import React from 'react';
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export const DashboardHeader = ({ title, description }) => {
    const { user } = useUser();

    return (
        <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <motion.h1 
                        className="text-3xl font-bold text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                    {description && (
                        <motion.p 
                            className="mt-1 text-gray-500 dark:text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>
                
                {user && (
                    <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.fullName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {user.primaryEmailAddress?.emailAddress}
                            </p>
                        </div>
                        {user.imageUrl && (
                            <img 
                                src={user.imageUrl} 
                                alt={user.fullName || "Profile"}
                                className="w-10 h-10 rounded-full"
                            />
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};