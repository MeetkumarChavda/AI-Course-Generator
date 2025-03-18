"use client"

import Link from 'next/link';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IoHomeOutline } from "react-icons/io5";
import { FiCompass, FiSettings, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { useClerk } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from './ThemeToggle';

export const SideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useClerk();
    const [usedCourses, setUsedCourses] = React.useState(3);
    const maxFreeCourses = 5;

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    const Menu = [
        {
            id: 1,
            name: "Home",
            icon: <IoHomeOutline className="text-xl" />,
            path: "/dashboard"
        },
        {
            id: 2,
            name: "Explore",
            icon: <FiCompass className="text-xl" />,
            path: "/dashboard/explore"
        },
        {
            id: 3,
            name: "Settings",
            icon: <FiSettings className="text-xl" />,
            path: "/dashboard/settings"
        }
    ];

    return (
        <motion.div 
            className='h-screen fixed w-64 p-5  border-r dark:border-gray-800 bg-background dark:bg-gray-900 transition-colors duration-200'
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Logo and Theme Toggle */}
            <div className="flex items-center justify-between mb-8">
                <motion.div 
                    className='flex items-center gap-2'
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className="relative w-8 h-8">
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
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                        AI Course Gen
                    </span>
                </motion.div>
                <ThemeToggle />
            </div>

            <hr className='border-gray-200 dark:border-gray-800 mb-6' />

            {/* Menu Items */}
            <div className='space-y-2'>
                {Menu.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link href={item.path}>
                            <div
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                    ${pathname === item.path 
                                        ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400' 
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <div className="text-lg">{item.icon}</div>
                                <h2 className="font-medium">{item.name}</h2>
                            </div>
                        </Link>
                    </motion.div>
                ))}
                
                {/* Logout Button */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    >
                        <FiLogOut className="text-lg" />
                        <span className="font-medium">Logout</span>
                    </button>
                </motion.div>
            </div>

            {/* Free Tier Progress */}
            <div className="pb-8 absolute bottom-5 left-5 right-5 space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Free Tier Usage</span>
                    <span>{usedCourses} / {maxFreeCourses}</span>
                </div>
                <Progress value={(usedCourses / maxFreeCourses) * 100} className="h-1" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {maxFreeCourses - usedCourses} courses remaining in free tier
                </p>
            </div>
        </motion.div>
    );
};