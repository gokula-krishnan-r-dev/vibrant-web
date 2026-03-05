"use client";

import Link from "next/link";
import { Leaf, Eye, EyeOff, Apple } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [mode, setMode] = useState<"signin" | "signup">("signin");

    return (
        <div className="min-h-[calc(100vh-80px)] flex">
            {/* Left decorative panel */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-[hsl(152_60%_28%)] to-[hsl(152_60%_16%)]">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #90f0b0, transparent 60%), radial-gradient(circle at 80% 80%, #2dd4bf, transparent 50%)" }} />
                <div className="relative z-10 flex flex-col justify-center items-center text-center p-16 text-white">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
                        <Leaf className="w-9 h-9 text-white" />
                    </div>
                    <h2 className="text-4xl font-black mb-4">Welcome to Vibrant</h2>
                    <p className="text-white/75 leading-relaxed max-w-xs">
                        Join thousands of customers who've transformed their wellness journey
                        with our premium, science-backed products.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-xs">
                        {[
                            { value: "50K+", label: "Happy Customers" },
                            { value: "6", label: "Premium Products" },
                            { value: "4.8★", label: "Average Rating" },
                            { value: "100%", label: "Natural Ingredients" },
                        ].map((s) => (
                            <div key={s.label} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-center">
                                <div className="text-2xl font-black mb-1">{s.value}</div>
                                <div className="text-xs text-white/70">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Auth form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl">Vibrant</span>
                    </Link>

                    <h1 className="text-3xl font-black mb-2">
                        {mode === "signin" ? "Welcome back" : "Create account"}
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))] mb-8">
                        {mode === "signin"
                            ? "Sign in to your Vibrant account"
                            : "Start your wellness journey today"}
                    </p>

                    {/* Social login */}
                    <div className="space-y-3 mb-6">
                        <button className={cn(
                            "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border font-medium text-sm",
                            "transition-all hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary)/0.3)] hover:-translate-y-0.5",
                            "bg-[hsl(var(--card))]"
                        )}>
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <button className={cn(
                            "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border font-medium text-sm",
                            "transition-all hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary)/0.3)] hover:-translate-y-0.5",
                            "bg-[hsl(var(--card))]"
                        )}>
                            <Apple className="w-5 h-5" />
                            Continue with Apple
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--background))] px-3">
                            or continue with email
                        </div>
                    </div>

                    {/* Email/password form */}
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {mode === "signup" && (
                            <div>
                                <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1.5 block">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border bg-[hsl(var(--surface-2))] text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)] focus:border-[hsl(var(--primary))] transition-all"
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1.5 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border bg-[hsl(var(--surface-2))] text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)] focus:border-[hsl(var(--primary))] transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-1.5 block">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-11 rounded-xl border bg-[hsl(var(--surface-2))] text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)] focus:border-[hsl(var(--primary))] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {mode === "signin" && (
                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-[hsl(var(--primary))] hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <Button type="submit" size="lg" className="w-full mt-2">
                            {mode === "signin" ? "Sign In" : "Create Account"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-6">
                        {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                            className="text-[hsl(var(--primary))] font-semibold hover:underline"
                        >
                            {mode === "signin" ? "Sign up" : "Sign in"}
                        </button>
                    </p>

                    <p className="text-[10px] text-center text-[hsl(var(--muted-foreground))] mt-4">
                        By continuing, you agree to our{" "}
                        <Link href="#" className="underline">Terms</Link> and{" "}
                        <Link href="#" className="underline">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
