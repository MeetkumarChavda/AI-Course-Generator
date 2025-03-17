"use client"

import React from 'react';
import { DashboardHeader } from './_components/DashboardHeader';
import { AddCourseButton } from './_components/AddCourseButton';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [usedCourses, setUsedCourses] = React.useState(3); // Example: 3 out of 5 courses used
  const maxFreeCourses = 5;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <DashboardHeader 
            title="Welcome to AI Course Gen" 
            description="Create New AI course, Manage, Share and Earn"
          />
        </div>
      </div>
        <div className="pt-2 flex justify-end">
          <AddCourseButton usedCourses={usedCourses} maxCourses={maxFreeCourses} />
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Total Courses', value: usedCourses, color: 'from-pink-500 to-rose-500' },
          { title: 'Active Students', value: '248', color: 'from-purple-500 to-indigo-500' },
          { title: 'Total Revenue', value: '$12,450', color: 'from-blue-500 to-cyan-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
            <p className={`mt-2 text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {[
              { title: 'New course enrollment', desc: 'John Doe enrolled in "AI Basics"', time: '2 hours ago' },
              { title: 'Course completed', desc: 'Sarah Smith completed "Web Development"', time: '5 hours ago' },
              { title: 'New review', desc: 'Mike Johnson left a 5-star review', time: '1 day ago' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}