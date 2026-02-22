'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    Command,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ArrowRight,
    Shield,
    Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function AdminLoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simülasyon - gerçek auth entegrasyonu için değiştirilecek
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Demo için direkt giriş
        router.push('/admin')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="w-full max-w-lg relative z-10">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <Link href="/" className="inline-flex items-center gap-3 mb-4">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="w-16 h-16 bg-gradient-to-br from-primary to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30"
                        >
                            <Command className="w-8 h-8 text-white" />
                        </motion.div>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">VEX Command Center</h1>
                    <p className="text-gray-500">Yönetim paneline giriş yapın</p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="border-0 shadow-2xl shadow-gray-200/50 overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="h-1 bg-gradient-to-r from-primary via-red-500 to-primary" />

                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-xl font-semibold text-center">Giriş Yap</CardTitle>
                            <CardDescription className="text-center">
                                Yönetici hesabınızla devam edin
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        E-posta Adresi
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@vexturkiye.org"
                                            className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Şifre
                                        </Label>
                                        <Link
                                            href="/admin/forgot-password"
                                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Şifremi Unuttum
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="pl-11 pr-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.remember}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, remember: checked as boolean })
                                        }
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-gray-600 cursor-pointer"
                                    >
                                        Beni hatırla
                                    </Label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-medium shadow-lg shadow-primary/30 transition-all"
                                >
                                    {isLoading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Zap className="w-5 h-5" />
                                        </motion.div>
                                    ) : (
                                        <>
                                            Giriş Yap
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <Shield className="w-4 h-4" />
                                    <span>256-bit SSL ile korunan güvenli bağlantı</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Back to Site Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-6"
                >
                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-1"
                    >
                        ← Ana siteye dön
                    </Link>
                </motion.div>

                {/* Version Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-8"
                >
                    <p className="text-xs text-gray-400">
                        VEX Command Center v1.0 • © 2026 VEX Türkiye
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
