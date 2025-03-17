"use client"

import { SideBar } from './_components/SideBar';
import { MobileNav } from './_components/MobileNav';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden md:flex h-screen w-72 flex-col fixed left-0 top-0 bottom-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-30">
                <SideBar />
            </div>

            {/* Mobile Navigation - shown only on mobile */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50">
                <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            </div>

            {/* Main Content */}
            <main className={`
                relative
                min-h-screen 
                transition-all 
                duration-300 
                md:pl-72
                ${isMobileMenuOpen ? 'max-h-screen overflow-hidden' : 'overflow-x-hidden'}
            `}>
                <div className="container mx-auto p-4 md:p-8 max-w-7xl">
                    <div className="md:hidden h-16" /> {/* Mobile header spacing */}
                    <div className="w-full max-w-full overflow-x-hidden">
                        {children}
                    </div>
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
