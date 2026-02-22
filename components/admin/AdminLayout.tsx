'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
    children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Header */}
            <AdminHeader
                sidebarCollapsed={sidebarCollapsed}
                onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content */}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={cn(
                    'pt-20 pb-8 px-6 transition-all duration-300 min-h-screen',
                    sidebarCollapsed ? 'ml-20' : 'ml-[280px]'
                )}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={typeof window !== 'undefined' ? window.location.pathname : 'initial'}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </motion.main>
        </div>
    )
}

export default AdminLayout
