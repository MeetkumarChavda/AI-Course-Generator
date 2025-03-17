"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './ThemeToggle';
import { HamburgerMenu } from './HamburgerMenu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoHomeOutline } from "react-icons/io5";
import { FiCompass, FiSettings, FiLogOut } from "react-icons/fi";
import { useClerk } from "@clerk/nextjs";

export const MobileNav = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    const menuItems = [
        { name: 'Home', path: '/dashboard', icon: <IoHomeOutline className="text-xl" /> },
        { name: 'Explore', path: '/dashboard/explore', icon: <FiCompass className="text-xl" /> },
        { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings className="text-xl" /> }
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="h-16 px-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                        <motion.svg 
                            width="100%" 
                            height="100%" 
                            viewBox="0 0 200 200" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                        AI Course Gen
                    </span>
                </div>

                {/* Theme Toggle and Menu Button */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <HamburgerMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto pb-safe"
                    >
                        <nav className="p-4 space-y-2">
                            {menuItems.map((item) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link 
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className={`
                                            flex items-center gap-3 p-4 rounded-lg transition-colors
                                            ${pathname === item.path 
                                                ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400' 
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                            }
                                        `}>
                                            {item.icon}
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Logout Button */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: 0.3 }}
                            >
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 p-4 rounded-lg transition-colors
                                        hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                                >
                                    <FiLogOut className="text-xl" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}; 