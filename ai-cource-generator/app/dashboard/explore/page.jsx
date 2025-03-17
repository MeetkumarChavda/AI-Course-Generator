"use client"

import { DashboardHeader } from "../_components/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ExplorePage() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <DashboardHeader
                heading="Explore Courses"
                subheading="Discover and enroll in AI-powered courses"
                showProgress={true}
            />

            {/* Search Section */}
            <div className="w-full max-w-3xl">
                <Input
                    type="search"
                    placeholder="Search courses..."
                    className="w-full bg-white dark:bg-gray-800"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                <Button variant="default" size="sm" className="rounded-full whitespace-nowrap">All</Button>
                <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">Beginner</Button>
                <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">Intermediate</Button>
                <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">Advanced</Button>
            </div>

            {/* Course Grid */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Introduction Course Card */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="p-4 md:p-6">
                        <h3 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                            Introduction to AI
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">
                            Learn the basics of Artificial Intelligence and Machine Learning
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                by Dr. Sarah Johnson
                            </div>
                            <div className="flex items-center">
                                <span className="text-purple-500">4.8</span>
                                <span className="text-yellow-400 ml-1">★</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 md:gap-4">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                Beginner
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                8 weeks
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Add more course cards here */}
            </motion.div>
        </div>
    );
}