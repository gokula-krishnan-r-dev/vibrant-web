"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ShoppingCart, Sun, Moon, Menu, X, Leaf, Search } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "#about", label: "About" },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const totalItems = useCartStore((s) => s.totalItems());
    const openCart = useCartStore((s) => s.openCart);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                    scrolled ? "glass shadow-sm border-b" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center transition-transform group-hover:scale-110">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">Vibrant</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors relative pb-1",
                                        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[hsl(var(--primary))] after:scale-x-0 after:transition-transform after:duration-200",
                                        "hover:text-[hsl(var(--primary))] hover:after:scale-x-100",
                                        pathname === link.href
                                            ? "text-[hsl(var(--primary))] after:scale-x-100"
                                            : "text-[hsl(var(--muted-foreground))]"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search */}
                            <button
                                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                aria-label="Search"
                            >
                                <Search className="w-4.5 h-4.5" />
                            </button>

                            {/* Theme Toggle */}
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                                </button>
                            )}

                            {/* Cart — opens sheet */}
                            <button
                                onClick={openCart}
                                className="w-9 h-9 rounded-lg flex items-center justify-center relative transition-all hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="w-4.5 h-4.5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[hsl(var(--primary))] text-white text-[10px] font-bold flex items-center justify-center animate-fade-in">
                                        {totalItems > 9 ? "9+" : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Login */}
                            <Link
                                href="/login"
                                className="hidden md:flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))/0.9] hover:-translate-y-0.5 transition-all shadow-sm"
                            >
                                Sign In
                            </Link>

                            {/* Hamburger */}
                            <button
                                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--muted))]"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Menu"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={cn("fixed inset-0 z-40 md:hidden transition-all duration-300", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}>
                <div
                    className={cn("absolute inset-0 bg-black/50 transition-opacity duration-300", mobileOpen ? "opacity-100" : "opacity-0")}
                    onClick={() => setMobileOpen(false)}
                />
                <div className={cn("absolute top-0 right-0 bottom-0 w-72 glass border-l transition-transform duration-300 pt-20 px-6", mobileOpen ? "translate-x-0" : "translate-x-full")}>
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                className={cn("px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    pathname === link.href ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]" : "hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                                )}
                            >{link.label}</Link>
                        ))}
                        <Link href="/login" onClick={() => setMobileOpen(false)}
                            className="mt-4 px-4 py-3 rounded-lg text-sm font-medium bg-[hsl(var(--primary))] text-white text-center"
                        >Sign In</Link>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-16 lg:h-20" />
        </>
    );
}
