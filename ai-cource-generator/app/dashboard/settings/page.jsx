"use client"

import { DashboardHeader } from "../_components/DashboardHeader";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <DashboardHeader
                heading="Settings"
                subheading="Manage your account settings and preferences"
                showProgress={true}
            />

            <div className="grid gap-6 w-full">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Account</h2>
                    <div className="grid gap-4 w-full">
                        <Card className="p-4 md:p-6 hover:shadow-md transition-shadow w-full">
                            <h3 className="text-base md:text-lg font-medium mb-2">Profile Information</h3>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                                Update your account profile information
                            </p>
                        </Card>

                        <Card className="p-4 md:p-6 hover:shadow-md transition-shadow w-full">
                            <h3 className="text-base md:text-lg font-medium mb-2">Email Preferences</h3>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                                Manage your email notifications
                            </p>
                        </Card>

                        <Card className="p-4 md:p-6 hover:shadow-md transition-shadow w-full">
                            <h3 className="text-base md:text-lg font-medium mb-2">Password & Security</h3>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                                Keep your account secure
                            </p>
                        </Card>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full"
                >
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Subscription</h2>
                    <Card className="p-4 md:p-6 hover:shadow-md transition-shadow w-full">
                        <h3 className="text-base md:text-lg font-medium mb-2">Free Plan</h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                            You are currently on the free plan
                        </p>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <button className="px-3 md:px-4 py-2 text-sm md:text-base bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                                Upgrade Plan
                            </button>
                            <button className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                View Plans
                            </button>
                        </div>
                    </Card>
                </motion.section>
            </div>
        </div>
    );
} 